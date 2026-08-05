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

    // Detect vector source
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

    // Elementos del Control
    const button = document.createElement('button');
    button.type = 'button';

    const form = document.createElement('form');
    form.setAttribute('id', 'ol-search-form');
    // Clase original para mantener compatibilidad con tus estilos CSS
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
    selParroquia.add(new Option("TODAS LAS PARROQUIAS", "TODAS")); // <-- NUEVA LÍNEA


    selVia.innerHTML = '<option value="">Vía...</option>';
    selNumero.innerHTML = '<option value="">Nº...</option>';

    form.appendChild(selParroquia);
    form.appendChild(selVia);
    form.appendChild(selNumero);
    
    
    
    
    
    
    
    // --- NUEVA BÚSQUEDA POR REFERENCIA CATASTRAL ---

// 1. Creamos el input de texto para la Ref. Catastral
const inputRC = document.createElement('input');
inputRC.type = 'text';
inputRC.id = 'search-rc';
inputRC.placeholder = 'Buscar Ref. Catastral...';
inputRC.style.width = '100%';
inputRC.style.marginTop = '5px';
form.appendChild(inputRC);

// 2. Esperamos a que la capa cargue sus datos
source.on('change', () => {
  if (source.getState() === 'ready') {
    
    let timeoutRC;
    
    // Inicializamos Horsey en el input de Referencia Catastral
    horsey(inputRC, {
      source: [{
        list: source.getFeatures().map((el, i) => {
          if (el.getId() === undefined) el.setId(i);
          return {
            // CAMBIA 'REFCAT' por el nombre exacto de la columna en tu GIS si es diferente
            text: el.get('REFCAT') || '', 
            value: el.getId()
          };
        }).filter(item => item.text !== '') // Descartamos los vacíos
      }],
      getText: 'text',
      getValue: 'value',
      limit: 5, // Mostramos solo los 5 mejores resultados para no ralentizar el renderizado
      
      // DEBOUNCE EFECTIVO: Filtra dinámicamente según escribe el usuario
      filter: function (query, selection) {
        if (query.length < 4) return false; // No busca hasta que escriba al menos 4 caracteres
        return selection.text.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      },
      
      // Acción al seleccionar una Referencia Catastral
      predictNextSearch: function(info) {
        const feat = source.getFeatureById(info.selection.value);
        if (feat) {
          const view = map.getView();
          // Centramos el mapa en la parcela elegida
          view.fit(feat.getGeometry().getExtent(), {
            size: map.getSize(),
            maxZoom: 19 // Un zoom idóneo para ver la parcela catastral de cerca
          });
          
          // Opcional: Seleccionar visualmente el elemento
          select.getFeatures().clear();
          select.getFeatures().push(feat);
        }
      }
    });
  }
});
    

    
    
    
    

    const element = document.createElement('div');
    element.className = 'search-layer ol-unselectable ol-control';
    element.appendChild(button);
    element.appendChild(form);

    super({
      element: element,
      target: options.target
    });

    this.map = options.map;
    this.tree = {}; // Estructura jerárquica para búsqueda instantánea
    this.currentSortedList = []

    Object.keys(this.tree).sort().forEach(p => {
      selParroquia.add(new Option(p, p));
    });    
    
    // Mostrar/Ocultar
    const toggleHideShowInput = () => {
      if (hasClass(form, 'search-layer-collapsed')) {
        removeClass(form, 'search-layer-collapsed');
      } else {
        addClass(form, 'search-layer-collapsed');
      }
    };

    button.addEventListener('click', toggleHideShowInput, false);

    // Interacción de selección
    const select = new ol.interaction.Select({
      layers: [options.layer],
      condition: ol.events.condition.never
    });
    this.map.addInteraction(select);

    // --- LÓGICA DE DATOS ---

    const buildTree = () => {
      const features = source.getFeatures();
      this.tree = {};

      features.forEach(f => {
        const props = f.getProperties();
        const parroquia = props.EibCcl_Callejero_eibEntAgp || "Otras";
        const via = props.EibCcl_Callejero_eibTipVia + "/ " + props.EibCcl_Callejero_eibNomVia || "Sin nombre";
        const numero = props.END_N1_00 + props.END_L1_00 || "S/N";

        if (!this.tree[parroquia]) this.tree[parroquia] = {};
        if (!this.tree[parroquia][via]) this.tree[parroquia][via] = [];
        
        this.tree[parroquia][via].push({
          num: numero,
          feature: f
        });
      });

      // Rellenar parroquias inicialmente
      const sortedParroquias = Object.keys(this.tree).sort();
      sortedParroquias.forEach(p => {
        const opt = new Option(p, p);
        selParroquia.add(opt);
      });
    };

    // Actualizar árbol cuando los datos carguen
    if (source.getState() === 'ready') buildTree();
    source.once('change', () => {
      if (source.getState() === 'ready') buildTree();
    });

    // Eventos de los Selectores
    selParroquia.onchange = () => {
  selVia.innerHTML = '<option value="">Vía...</option>';
  selNumero.innerHTML = '<option value="">Nº...</option>';
  
  const p = selParroquia.value;
  if (!p) return;

  let viasDisponibles = [];

  if (p === "TODAS") {
    // Si selecciona "TODAS", agrupamos las vías de todas las parroquias
    Object.keys(this.tree).forEach(parroquiaKey => {
      Object.keys(this.tree[parroquiaKey]).forEach(viaKey => {
        // Evitamos duplicar nombres de vías si existen en varias parroquias
        if (!viasDisponibles.includes(viaKey)) {
          viasDisponibles.push(viaKey);
        }
      });
    });
  } else if (this.tree[p]) {
    // Si selecciona una parroquia concreta, extraemos solo sus vías
    viasDisponibles = Object.keys(this.tree[p]);
  }

  // Ordenamos alfabéticamente todas las vías obtenidas y las añadimos al select
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
    // Buscamos la vía 'v' en cualquier parroquia que la tenga
    Object.keys(this.tree).forEach(parroquiaKey => {
      if (this.tree[parroquiaKey][v]) {
        numerosAcumulados = numerosAcumulados.concat(this.tree[parroquiaKey][v]);
      }
    });
  } else if (p && this.tree[p] && this.tree[p][v]) {
    // Caso normal: una parroquia y vía concretas
    numerosAcumulados = this.tree[p][v];
  }

  if (numerosAcumulados.length > 0) {
    // Ordenamos los números de forma natural (1, 2, 10 en vez de 1, 10, 2)
    const sortedNums = numerosAcumulados.sort((a, b) => 
      a.num.toString().localeCompare(b.num.toString(), undefined, {numeric: true})
    );
    
    // Guardamos la lista ordenada en la variable global/clase que usamos en el paso anterior
    this.currentSortedList = sortedNums; 

    sortedNums.forEach((item, index) => {
      selNumero.add(new Option(item.num, index));
    });
  }
};

selNumero.onchange = () => {
  const idx = selNumero.value;
  if (idx !== "") {
    // AQUÍ ESTÁ EL CAMBIO: usamos la lista que guardamos
    const feature = this.currentSortedList[idx].feature; 
    
    const geom = feature.getGeometry();
    
    // Zoom y centrado
    if (geom.getType() === 'Point') {
      this.map.getView().animate({
        center: geom.getCoordinates(),
        zoom: 19, // Ajusta a tu gusto
        duration: 2000
      });
    } else {
      this.map.getView().fit(geom.getExtent(), { duration: 1000 });
    }

    // Resaltar
    select.getFeatures().clear();
    select.getFeatures().push(feature);
  }
};











  }
}




/*
class SearchLayer extends ol.control.Control {
  constructor(optOptions) {
    const horseyComponentRef = { current: null };
    const selectRef = { current: null };

    const options = optOptions || {};
    if (!options.layer) {
      throw new Error('Missing layer in options');
    }
	
	options.maxResults = (optOptions && typeof optOptions.maxResults === 'number') 
	  ? optOptions.maxResults 
	  : 10;

    options.map = optOptions.map;
    options.colName = optOptions.colName;

    // Detect vector source
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

    // Create button
    const button = document.createElement('button');
    const toggleHideShowInput = () => {
      const input = document.querySelector('form > .search-layer-input-search');
      if (hasClass(input, 'search-layer-collapsed')) {
        removeClass(input, 'search-layer-collapsed');
      } else {
        input.value = '';
        addClass(input, 'search-layer-collapsed');
        if (horseyComponentRef.current) {
          horseyComponentRef.current.hide();
        }
        if (selectRef.current) {
          selectRef.current.getFeatures().clear();
        }
      }
    };

    button.addEventListener('click', toggleHideShowInput, false);
    button.addEventListener('touchstart', toggleHideShowInput, false);

    // Create input
    const form = document.createElement('form');
    form.setAttribute('id', 'random');
    form.onsubmit = undefined;

    const input = document.createElement('input');
    input.setAttribute('id', 'ol-search-input');
    const defaultInputClass = ['search-layer-input-search'];
    if (optOptions.collapsed) {
      defaultInputClass.push('search-layer-collapsed');
    }
    input.setAttribute('class', defaultInputClass.join(' '));
    input.setAttribute('placeholder', 'Search ...');
    input.setAttribute('type', 'text');
    form.appendChild(input);

    // Build control element
    const element = document.createElement('div');
    element.className = 'search-layer ol-unselectable ol-control';
    element.appendChild(button);
    element.appendChild(form);

    // Initialize base class
    super({
      element: element,
      target: options.target
    });

    // Create select interaction
    const select = new ol.interaction.Select({
      id: options.selectId || 'defaultSearchLayer',
      layers: [options.layer],
      condition: ol.events.condition.never
    });

    selectRef.current = select;

    const map = options.map;
    map.addInteraction(select);

    // Setup horsey autocomplete
    const typesToZoomToExtent = [
      'MultiPoint', 'LineString', 'MultiLineString', 'MultiPolygon', 'Polygon'
    ];
    const typesToZoomToCenterAndZoom = ['Point'];

    const returnHorsey = (input, source, map, select, options) => {
      return horsey(input, {
        source: [{
          list: source.getFeatures().map((el, i) => {
            if (el.getId() === undefined) {
              el.setId(i);
            }
            return {
              text: el.get(options.colName),
              value: el.getId()
            };
          })
        }],
        getText: 'text',
        getValue: 'value',
		limit: options.maxResults,
        predictNextSearch: function(info) {
          const feat = source.getFeatureById(info.selection.value);
          const featType = feat.getGeometry().getType();

          if (typesToZoomToCenterAndZoom.includes(featType)) {
            const newCenter = ol.extent.getCenter(feat.getGeometry().getExtent());
            map.getView().setCenter(newCenter);
            map.getView().setZoom(options.zoom || 12);
          } else if (typesToZoomToExtent.includes(featType)) {
            map.getView().fit(feat.getGeometry().getExtent(), map.getSize());
          }

          select.getFeatures().clear();
          select.getFeatures().push(feat);
        }
      });
    };

    if (source.getState() === 'ready') {
      horseyComponentRef.current = returnHorsey(input, source, map, select, options);
    }

    source.once('change', () => {
      if (source.getState() === 'ready') {
        horseyComponentRef.current = returnHorsey(input, source, map, select, options);
      }
    });
  }
}
*/