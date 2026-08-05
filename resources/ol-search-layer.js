function hasClass(el, cls) {
  return el.className && new RegExp('(\\s|^)' +    cls + '(\\s|$)').test(el.className);
}

function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className += ' ' + className;
  }
}

function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}


class SearchLayer extends ol.control.Control {
  constructor(optOptions) {
    const options = optOptions || {};
    if (!options.layer) {
      throw new Error('Missing layer in options');
    }

    // 1. Detectar vector source
    let source;
    if (options.layer instanceof ol.layer.Image &&
        options.layer.getSource() instanceof ol.source.ImageVector) {
      source = options.layer.getSource().getSource();
    } else if (options.layer instanceof ol.layer.Vector) {
      source = options.layer.getSource();
    }
    if (source instanceof ol.source.Cluster) {
      source = source.getSource();
    }

    // 2. IMPORTANTE: Declaramos map y select al principio para que Horsey pueda usarlos
    const map = options.map;
    const select = new ol.interaction.Select({
      layers: [options.layer],
      condition: ol.events.condition.never
    });
    if (map) {
      map.addInteraction(select);
    }

    // Elementos del Control HTML
    const button = document.createElement('button');
    button.type = 'button';

    const form = document.createElement('form');
    form.setAttribute('id', 'ol-search-form');
    const defaultFormClass = ['search-layer-input-search'];
    if (optOptions.collapsed) {
      defaultFormClass.push('search-layer-collapsed');
    }
    form.setAttribute('class', defaultFormClass.join(' '));

    // Crear los 3 selectores
    const selParroquia = document.createElement('select');
    const selVia = document.createElement('select');
    const selNumero = document.createElement('select');

    selParroquia.innerHTML = '<option value="">Parroquia...</option>';
    selParroquia.add(new Option("TODAS LAS PARROQUIAS", "TODAS"));

    selVia.innerHTML = '<option value="">Vía...</option>';
    selNumero.innerHTML = '<option value="">Nº...</option>';

    form.appendChild(selParroquia);
    form.appendChild(selVia);
    form.appendChild(selNumero);
    
    // --- NUEVA BÚSQUEDA POR REFERENCIA CATASTRAL ---
    const inputRC = document.createElement('input');
    inputRC.type = 'text';
    inputRC.id = 'search-rc';
    inputRC.placeholder = 'Buscar Ref. Catastral...';
    inputRC.style.width = '100%';
    inputRC.style.marginTop = '6px';
    form.appendChild(inputRC);

    const element = document.createElement('div');
    element.className = 'search-layer ol-unselectable ol-control';
    element.appendChild(button);
    element.appendChild(form);

    // Inicializar clase base de OpenLayers
    super({
      element: element,
      target: options.target
    });

    this.map = map;
    this.tree = {}; 
    this.currentSortedList = [];

    // --- MOTOR HORSEY PARA REFERENCIA CATASTRAL ---
    const inicializarHorseyRC = () => {
      // Auto-detección inteligente del nombre de columna (REFCAT, refcat, Refcat...)
      let columnaCatastro = 'REFCAT';
      const features = source.getFeatures();
      if (features.length > 0) {
        const props = features[0].getProperties();
        const claves = Object.keys(props);
        const claveEncontrada = claves.find(k => k.toLowerCase() === 'refcat' || k.toLowerCase() === 'rc');
        if (claveEncontrada) columnaCatastro = claveEncontrada;
      }

      horsey(inputRC, {
        source: [{
          list: source.getFeatures().map((el, i) => {
            if (el.getId() === undefined) el.setId(i);
            const val = el.get(columnaCatastro) || '';
            return {
              text: val.toString().trim(), 
              value: el.getId()
            };
          }).filter(item => item.text !== '') 
        }],
        getText: 'text',
        getValue: 'value',
        limit: 5, 
        filter: function (query, selection) {
          if (query.length < 4) return false; // Mínimo 4 caracteres para arrancar
          return selection.text.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        },
        predictNextSearch: function(info) {
          const feat = source.getFeatureById(info.selection.value);
          if (feat && map) {
          	
          	selParroquia.value = '';
              selVia.innerHTML = '<option value="">Vía...</option>';
              selNumero.innerHTML = '<option value="">Nº...</option>';
          	
            const view = map.getView();
            view.fit(feat.getGeometry().getExtent(), {
              size: map.getSize(),
              maxZoom: 19 
            });
            
            select.getFeatures().clear();
            select.getFeatures().push(feat);
          }
        }
      });
    };

    // Lanzar Horsey cuando la capa esté lista
    if (source.getState() === 'ready') inicializarHorseyRC();
    source.on('change', () => {
      if (source.getState() === 'ready') inicializarHorseyRC();
    });

    // Mostrar/Ocultar panel
    const toggleHideShowInput = () => {
      if (hasClass(form, 'search-layer-collapsed')) {
        removeClass(form, 'search-layer-collapsed');
      } else {
        addClass(form, 'search-layer-collapsed');
      }
    };
    button.addEventListener('click', toggleHideShowInput, false);

    // --- LÓGICA DEL ÁRBOL JERÁRQUICO (PARROQUIAS Y VÍAS) ---
    const buildTree = () => {
      const features = source.getFeatures();
      this.tree = {};

      features.forEach(f => {
        const props = f.getProperties();
        const parroquia = props.EibCcl_Callejero_eibEntAgp || "Otras";
        const via = (props.EibCcl_Callejero_eibTipVia || "") + "/ " + (props.EibCcl_Callejero_eibNomVia || "Sin nombre");
        const numero = (props.END_N1_00 || "") + (props.END_L1_00 || "");

        if (!this.tree[parroquia]) this.tree[parroquia] = {};
        if (!this.tree[parroquia][via]) this.tree[parroquia][via] = [];
        
        this.tree[parroquia][via].push({
          num: numero || "S/N",
          feature: f
        });
      });

      selParroquia.innerHTML = '<option value="">Parroquia...</option>';
      selParroquia.add(new Option("TODAS LAS PARROQUIAS", "TODAS"));
      Object.keys(this.tree).sort().forEach(p => {
        selParroquia.add(new Option(p, p));
      });
    };

    if (source.getState() === 'ready') buildTree();
    source.on('change', () => {
      if (source.getState() === 'ready') buildTree();
    });

    // Eventos de interacción de los selectores
    selParroquia.onchange = () => {
    	inputRC.value = '';
      selVia.innerHTML = '<option value="">Vía...</option>';
      selNumero.innerHTML = '<option value="">Nº...</option>';
      
      const p = selParroquia.value;
      if (!p) return;

      let viasDisponibles = [];
      if (p === "TODAS") {
        Object.keys(this.tree).forEach(parroquiaKey => {
          Object.keys(this.tree[parroquiaKey]).forEach(viaKey => {
            if (!viasDisponibles.includes(viaKey)) {
              viasDisponibles.push(viaKey);
            }
          });
        });
      } else if (this.tree[p]) {
        viasDisponibles = Object.keys(this.tree[p]);
      }

      viasDisponibles.sort().forEach(v => {
        selVia.add(new Option(v, v));
      });
    };

    selVia.onchange = () => {
      selNumero.innerHTML = '<option value="">Nº...</option>';
      const p = selParroquia.value;
      const v = selVia.value;
      
      if (!v) return;

      let numerosAcumulados = [];
      if (p === "TODAS") {
        Object.keys(this.tree).forEach(parroquiaKey => {
          if (this.tree[parroquiaKey][v]) {
            numerosAcumulados = numerosAcumulados.concat(this.tree[parroquiaKey][v]);
          }
        });
      } else if (p && this.tree[p] && this.tree[p][v]) {
        numerosAcumulados = this.tree[p][v];
      }

      if (numerosAcumulados.length > 0) {
        const sortedNums = numerosAcumulados.sort((a, b) => 
          a.num.toString().localeCompare(b.num.toString(), undefined, {numeric: true})
        );
        
        this.currentSortedList = sortedNums; 
        sortedNums.forEach((item, index) => {
          selNumero.add(new Option(item.num, index));
        });
      }
    };

    selNumero.onchange = () => {
      const idx = selNumero.value;
      if (idx !== "" && this.map) {
        const feature = this.currentSortedList[idx].feature; 
        const geom = feature.getGeometry();
        
        if (geom.getType() === 'Point') {
          this.map.getView().animate({
            center: geom.getCoordinates(),
            zoom: 19, 
            duration: 2000
          });
        } else {
          this.map.getView().fit(geom.getExtent(), { duration: 1000 });
        }

        select.getFeatures().clear();
        select.getFeatures().push(feature);
      }
    };
  }
}