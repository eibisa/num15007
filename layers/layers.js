var wms_layers = [];


        var lyr_GoogleSatellite_0 = new ol.layer.Tile({
            'title': 'Google Satellite',
            'opacity': 0.700000,
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
            })
        });
var lyr_Ortoimagen_1 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://www.ign.es/wms-inspire/pnoa-ma?",
                              attributions: ' ',
                              params: {
                                "LAYERS": "OI.OrthoimageCoverage",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'Ortoimagen',
                            popuplayertitle: 'Ortoimagen',
                            type: '',
                            opacity: 0.700000,
                            
                            
                          });
              wms_layers.push([lyr_Ortoimagen_1, 0]);
var lyr_Catastro_2 = new ol.layer.Image({
                            source: new ol.source.ImageWMS(({
                              url: "https://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx",
                              attributions: ' ',
                              params: {
                                "LAYERS": "Catastro",
                                "TILED": "true",
                                "VERSION": "1.1.1"},
                            })),
                            title: 'Catastro',
                            popuplayertitle: 'Catastro',
                            type: '',
                            opacity: 1.000000,
                          });
              wms_layers.push([lyr_Catastro_2, 0]);
var format_EibCcl_Numeracion_Catastro_3 = new ol.format.GeoJSON();
var features_EibCcl_Numeracion_Catastro_3 = format_EibCcl_Numeracion_Catastro_3.readFeatures(json_EibCcl_Numeracion_Catastro_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_EibCcl_Numeracion_Catastro_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_EibCcl_Numeracion_Catastro_3.addFeatures(features_EibCcl_Numeracion_Catastro_3);
var lyr_EibCcl_Numeracion_Catastro_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_EibCcl_Numeracion_Catastro_3,
maxResolution:14.282277737653603,
 minResolution:0.00028004466152261963,

                style: style_EibCcl_Numeracion_Catastro_3,
                popuplayertitle: 'Numeración A Baña',
                interactive: true,
                title: 'Numeración A Baña'
            });
var group_Eib_Numeracion = new ol.layer.Group({
                                layers: [lyr_EibCcl_Numeracion_Catastro_3,],
                                fold: 'close',
                                title: 'NUMERACION'});
var group_Auxiliares = new ol.layer.Group({
                                layers: [],
                                fold: 'open',
                                title: 'Auxiliares'});
var group_Eib_Trabajo = new ol.layer.Group({
                                layers: [],
                                fold: 'open',
                                title: 'Eib_Trabajo'});
var group_Varios = new ol.layer.Group({
                                layers: [lyr_GoogleSatellite_0,lyr_Ortoimagen_1,lyr_Catastro_2,],
                                fold: 'open',
                                title: 'AUXILIARES'});
var group_Cartografia = new ol.layer.Group({
                                layers: [],
                                fold: 'close',
                                title: 'Cartografia'});

var format_Eib_Lugares_0 = new ol.format.GeoJSON();
var features_Eib_Lugares_0 = format_Eib_Lugares_0.readFeatures(json_Eib_Lugares_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Eib_Lugares_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Eib_Lugares_0.addFeatures(features_Eib_Lugares_0);
var lyr_Eib_Lugares_0 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Eib_Lugares_0, 
                style: style_Eib_Lugares_0,
                popuplayertitle: 'Vías/Lugares A Baña',
                interactive: true,
                opacity: 0.40000,
    title: 'Vías/Lugares A Baña<br />\
    <img src="styles/legend/Eib_Lugares_0_46.png" />  3 - LG / CANLIS     <br />\
    <img src="styles/legend/Eib_Lugares_0_62.png" />  5 - LG / CASTRO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_18.png" />  12 - LG / FAMPOUSA<br />\
    <img src="styles/legend/Eib_Lugares_0_32.png" />  15 - LG / GUENDE<br />\
    <img src="styles/legend/Eib_Lugares_0_38.png" />  16 - LG / XASOSO<br />\
    <img src="styles/legend/Eib_Lugares_0_39.png" />  17 - LG / LIÑARES<br />\
    <img src="styles/legend/Eib_Lugares_0_40.png" />  19 - LG / PAREDES<br />\
    <img src="styles/legend/Eib_Lugares_0_41.png" />  21 - LG / SALVANDE<br />\
    <img src="styles/legend/Eib_Lugares_0_42.png" />  22 - LG / SAN SALVADOR<br />\
    <img src="styles/legend/Eib_Lugares_0_43.png" />  25 - LG / SEÑOR<br />\
    <img src="styles/legend/Eib_Lugares_0_44.png" />  26 - LG / VESIA<br />\
    <img src="styles/legend/Eib_Lugares_0_45.png" />  27 - LG / VILARNOVO<br />\
    <img src="styles/legend/Eib_Lugares_0_47.png" />  30 - LG / CHANTADA<br />\
    <img src="styles/legend/Eib_Lugares_0_48.png" />  31 - LG / SAN CIBRAN<br />\
    <img src="styles/legend/Eib_Lugares_0_49.png" />  32 - LG / TARROEIRA (A)<br />\
    <img src="styles/legend/Eib_Lugares_0_50.png" />  34 - LG / ARZON<br />\
    <img src="styles/legend/Eib_Lugares_0_51.png" />  35 - LG / CORES<br />\
    <img src="styles/legend/Eib_Lugares_0_52.png" />  36 - LG / EMES<br />\
    <img src="styles/legend/Eib_Lugares_0_53.png" />  37 - LG / LAMEIRO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_54.png" />  38 - LG / SEOANE<br />\
    <img src="styles/legend/Eib_Lugares_0_55.png" />  40 - LG / BARRO DE ABAIXO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_56.png" />  41 - LG / BARRO DE ARRIBA (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_57.png" />  43 - LG / SINO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_58.png" />  45 - LG / CABANAS<br />\
    <img src="styles/legend/Eib_Lugares_0_59.png" />  46 - LG / GUIMARANS<br />\
    <img src="styles/legend/Eib_Lugares_0_60.png" />  47 - LG / IGREXA (A)<br />\
    <img src="styles/legend/Eib_Lugares_0_61.png" />  48 - LG / PAZO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_63.png" />  50 - LG / AGROMAIOR<br />\
    <img src="styles/legend/Eib_Lugares_0_64.png" />  51 - LG / BARREIROS (OS)<br />\
    <img src="styles/legend/Eib_Lugares_0_65.png" />  52 - LG / CORNEIRA<br />\
    <img src="styles/legend/Eib_Lugares_0_66.png" />  54 - LG / FERRACES<br />\
    <img src="styles/legend/Eib_Lugares_0_67.png" />  55 - LG / OUTEIRO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_68.png" />  56 - LG / PIOLLA (A)<br />\
    <img src="styles/legend/Eib_Lugares_0_69.png" />  57 - LG / PONTE CORNEIRA<br />\
    <img src="styles/legend/Eib_Lugares_0_70.png" />  58 - LG / VILANOVA<br />\
    <img src="styles/legend/Eib_Lugares_0_71.png" />  59 - LG / VILAR DE CERDEIRAS<br />\
    <img src="styles/legend/Eib_Lugares_0_72.png" />  60 - LG / VILAR DE CIMA<br />\
    <img src="styles/legend/Eib_Lugares_0_73.png" />  61 - LG / VILARIÑO<br />\
    <img src="styles/legend/Eib_Lugares_0_74.png" />  63 - LG / HEDREIRA (A)<br />\
    <img src="styles/legend/Eib_Lugares_0_75.png" />  64 - LG / ERMIDA (A)<br />\
    <img src="styles/legend/Eib_Lugares_0_76.png" />  65 - LG / GOSENDE<br />\
    <img src="styles/legend/Eib_Lugares_0_77.png" />  67 - LG / ALDE (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_78.png" />  68 - LG / ESTIVADIÑA<br />\
    <img src="styles/legend/Eib_Lugares_0_79.png" />  69 - LG / FIOPANS<br />\
    <img src="styles/legend/Eib_Lugares_0_80.png" />  70 - LG / TROITOMIL<br />\
    <img src="styles/legend/Eib_Lugares_0_81.png" />  71 - LG / VILAR DE SUSO<br />\
    <img src="styles/legend/Eib_Lugares_0_82.png" />  73 - LG / CANTALARRANA<br />\
    <img src="styles/legend/Eib_Lugares_0_83.png" />  74 - LG / CASTRO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_84.png" />  75 - LG / LAÑAS<br />\
    <img src="styles/legend/Eib_Lugares_0_85.png" />  76 - LG / MEIMENDRE<br />\
    <img src="styles/legend/Eib_Lugares_0_86.png" />  77 - LG / MUNDRIS<br />\
    <img src="styles/legend/Eib_Lugares_0_87.png" />  78 - LG / PROUSOR<br />\
    <img src="styles/legend/Eib_Lugares_0_88.png" />  79 - LG / VALIÑA<br />\
    <img src="styles/legend/Eib_Lugares_0_89.png" />  80 - LG / VILAR DA TORRE<br />\
    <img src="styles/legend/Eib_Lugares_0_90.png" />  82 - LG / OUTEIRO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_91.png" />  83 - LG / QUINTEIRO<br />\
    <img src="styles/legend/Eib_Lugares_0_92.png" />  84 - LG / VILAR<br />\
    <img src="styles/legend/Eib_Lugares_0_93.png" />  86 - LG / BUCHAIN<br />\
    <img src="styles/legend/Eib_Lugares_0_94.png" />  87 - LG / SEILAN (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_95.png" />  88 - LG / DUOMES DE ABAIXO<br />\
    <img src="styles/legend/Eib_Lugares_0_96.png" />  89 - LG / DUOMES DE ARRIBA<br />\
    <img src="styles/legend/Eib_Lugares_0_97.png" />  90 - LG / NANTON<br />\
    <img src="styles/legend/Eib_Lugares_0_98.png" />  91 - LG / RUCHEIRO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_99.png" />  92 - LG / SANAMEDE<br />\
    <img src="styles/legend/Eib_Lugares_0_100.png" />  94 - LG / BUSTO<br />\
    <img src="styles/legend/Eib_Lugares_0_101.png" />  95 - LG / CANLE (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_102.png" />  96 - LG / COTOBADE<br />\
    <img src="styles/legend/Eib_Lugares_0_103.png" />  97 - LG / COUTO CARBALLO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_104.png" />  98 - LG / CRUCEIRO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_0.png" />  100 - LG / PARAXO<br />\
    <img src="styles/legend/Eib_Lugares_0_1.png" />  101 - LG / REIVERDE<br />\
    <img src="styles/legend/Eib_Lugares_0_2.png" />  102 - LG / RIAL (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_3.png" />  104 - LG / BAFADUIRA<br />\
    <img src="styles/legend/Eib_Lugares_0_4.png" />  105 - LG / CAMPELO<br />\
    <img src="styles/legend/Eib_Lugares_0_5.png" />  106 - LG / CARBALLEIRA (A)<br />\
    <img src="styles/legend/Eib_Lugares_0_6.png" />  107 - LG / COSTA (A)<br />\
    <img src="styles/legend/Eib_Lugares_0_7.png" />  108 - LG / FERREIROS<br />\
    <img src="styles/legend/Eib_Lugares_0_8.png" />  109 - LG / FOLGUEIRA<br />\
    <img src="styles/legend/Eib_Lugares_0_9.png" />  110 - LG / LOUREIRO PEQUENO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_10.png" />  111 - LG / MANLE<br />\
    <img src="styles/legend/Eib_Lugares_0_11.png" />  112 - LG / RIBA (A)<br />\
    <img src="styles/legend/Eib_Lugares_0_12.png" />  113 - LG / SAN XOAN<br />\
    <img src="styles/legend/Eib_Lugares_0_13.png" />  114 - LG / TRECE<br />\
    <img src="styles/legend/Eib_Lugares_0_14.png" />  115 - LG / VIGOBO<br />\
    <img src="styles/legend/Eib_Lugares_0_15.png" />  117 - LG / CRUZ (A)<br />\
    <img src="styles/legend/Eib_Lugares_0_16.png" />  118 - LG / CHOUPANA (A)<br />\
    <img src="styles/legend/Eib_Lugares_0_17.png" />  119 - LG / FAXIN<br />\
    <img src="styles/legend/Eib_Lugares_0_19.png" />  120 - LG / FAILDE (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_20.png" />  121 - LG / FRANCOS<br />\
    <img src="styles/legend/Eib_Lugares_0_21.png" />  122 - LG / REGUENGO<br />\
    <img src="styles/legend/Eib_Lugares_0_22.png" />  123 - LG / SUEVOS<br />\
    <img src="styles/legend/Eib_Lugares_0_23.png" />  125 - LG / MENLLE DE ABAIXO<br />\
    <img src="styles/legend/Eib_Lugares_0_24.png" />  126 - LG / MENLLE DE ARRIBA<br />\
    <img src="styles/legend/Eib_Lugares_0_25.png" />  127 - LG / PORTOCHAN<br />\
    <img src="styles/legend/Eib_Lugares_0_26.png" />  128 - LG / QUINTANS<br />\
    <img src="styles/legend/Eib_Lugares_0_27.png" />  129 - LG / TROITOSENDE<br />\
    <img src="styles/legend/Eib_Lugares_0_28.png" />  130 - LG / VILACOBA<br />\
    <img src="styles/legend/Eib_Lugares_0_29.png" />  131 - LG / VILELA<br />\
    <img src="styles/legend/Eib_Lugares_0_30.png" />  147 - LG / MOLDES<br />\
    <img src="styles/legend/Eib_Lugares_0_31.png" />  148 - LG / ESPESEDO<br />\
    <img src="styles/legend/Eib_Lugares_0_33.png" />  153 - LG / FOXAS (AS)<br />\
    <img src="styles/legend/Eib_Lugares_0_34.png" />  154 - LG / VILAR<br />\
    <img src="styles/legend/Eib_Lugares_0_35.png" />  155 - LG / CHANS<br />\
    <img src="styles/legend/Eib_Lugares_0_36.png" />  156 - LG / EIROA<br />\
    <img src="styles/legend/Eib_Lugares_0_37.png" />  158 - LG / CASTIÑEIRA (A)<br />\
    <img src="styles/legend/Eib_Lugares_0_105.png" /> <br />' });
var group_Eib_Trabajo = new ol.layer.Group({
                                layers: [lyr_Eib_Lugares_0,],
                                fold: 'close',
                                title: 'NUCLEOS'});
lyr_Eib_Lugares_0.set('fieldAliases', {'fid': 'fid', 'EibCodVia': 'Cód. vía', 'EibCcl_Callejero_eibTipVia': 'Sigla', 'EibCcl_Callejero_eibNomVia': 'Nombre lugar/vía', 'EibCcl_Callejero_eibEntAgp': 'Parroquia', });
lyr_Eib_Lugares_0.set('fieldImages', {'fid': 'TextEdit', 'EibCodVia': 'Range', 'EibCcl_Callejero_eibTipVia': 'TextEdit', 'EibCcl_Callejero_eibNomVia': 'TextEdit', 'EibCcl_Callejero_eibEntAgp': 'TextEdit', });
lyr_Eib_Lugares_0.set('fieldLabels', {'fid': 'hidden field', 'EibCodVia': 'inline label - always visible', 'EibCcl_Callejero_eibTipVia': 'inline label - always visible', 'EibCcl_Callejero_eibNomVia': 'inline label - always visible', 'EibCcl_Callejero_eibEntAgp': 'inline label - always visible', });
lyr_Eib_Lugares_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});

lyr_GoogleSatellite_0.setVisible(true);lyr_Ortoimagen_1.setVisible(false);lyr_Catastro_2.setVisible(true);lyr_EibCcl_Numeracion_Catastro_3.setVisible(true);
var layersList = [group_Varios,group_Eib_Numeracion,group_Eib_Trabajo];
lyr_EibCcl_Numeracion_Catastro_3.set('fieldAliases', {'fid': 'fid', 'REFCAT': 'REF. CATASTRAL', 'EibCcl_Callejero_eibEntAgp': 'PARROQUIA', 'ENH_CV_00': 'ENH_CV_00', 'ENH_N1_00': 'ENH_N1_00', 'ENH_L1_00': 'ENH_L1_00', 'ENH_MARCA': 'ENH_MARCA', 'ENC_CV_00': 'ENC_CV_00', 'ENC_N1_00': 'ENC_N1_00', 'ENC_L1_00': 'ENC_L1_00', 'ENC_MARCA': 'ENC_MARCA', 'ENA_CV_00': 'ENA_CV_00', 'ENA_N1_00': 'ENA_N1_00', 'ENA_L1_00': 'ENA_L1_00', 'ENA_MARCA': 'ENA_MARCA', 'ENP_CV_00': 'ENP_CV_00', 'ENP_N1_00': 'ENP_N1_00', 'ENP_L1_00': 'ENP_L1_00', 'ENP_MARCA': 'ENP_MARCA', 'END_CV_00': 'END_CV_00', 'END_N1_00': 'NUMERO', 'END_L1_00': 'LETRA', 'END_MARCA': 'END_MARCA', 'EN1_TIPO': 'EN1_TIPO', 'NOMVIA': 'EN1_NOMVIA', 'EN1_PRQ': 'EN1_PRQ', 'EN1_SGVIA': 'EN1_SGVIA', 'Copia_5': 'Copia_5', 'Copia_6': 'Copia_6', 'Copia_7': 'Copia_7', 'Copia_8': 'Copia_8', 'DUPLICADOS': 'DUPLICADOS', 'rotation': 'rotation', 'EibCcl_Callejero_eibTipVia': 'SIGLA', 'EibCcl_Callejero_eibNomVia': 'VIA/LUGAR', 'CV_NUM': 'CV_NUM', 'ID_CV_NA': 'ID_CV_NA', 'ID_CV_NP': 'ID_CV_NP', 'ID_MODIF': 'MODIFICACION', 'ID_CV_ND': 'ID_CV_ND', 'DIRECCION': 'DIRECCION', });
lyr_EibCcl_Numeracion_Catastro_3.set('fieldImages', {'fid': 'TextEdit', 'REFCAT': 'TextEdit', 'EibCcl_Callejero_eibEntAgp': 'TextEdit', 'ENH_CV_00': 'Range', 'ENH_N1_00': 'Range', 'ENH_L1_00': 'TextEdit', 'ENH_MARCA': 'TextEdit', 'ENC_CV_00': 'Range', 'ENC_N1_00': 'Range', 'ENC_L1_00': 'TextEdit', 'ENC_MARCA': 'TextEdit', 'ENA_CV_00': 'Range', 'ENA_N1_00': 'Range', 'ENA_L1_00': 'TextEdit', 'ENA_MARCA': 'TextEdit', 'ENP_CV_00': 'Range', 'ENP_N1_00': 'Range', 'ENP_L1_00': 'TextEdit', 'ENP_MARCA': 'TextEdit', 'END_CV_00': 'Range', 'END_N1_00': 'Range', 'END_L1_00': 'TextEdit', 'END_MARCA': 'TextEdit', 'EN1_TIPO': 'TextEdit', 'EN1_NOMVIA': 'TextEdit', 'EN1_PRQ': 'TextEdit', 'EN1_SGVIA': 'TextEdit', 'Copia_5': 'TextEdit', 'Copia_6': 'TextEdit', 'Copia_7': 'TextEdit', 'Copia_8': 'TextEdit', 'DUPLICADOS': 'TextEdit', 'rotation': 'TextEdit', 'EibCcl_Callejero_eibTipVia': 'TextEdit', 'EibCcl_Callejero_eibNomVia': 'TextEdit', 'CV_NUM': 'TextEdit', 'ID_CV_NA': 'Range', 'ID_CV_NP': 'Range', 'ID_MODIF': 'TextEdit', 'ID_CV_ND': 'Range', 'DIRECCION': 'TextEdit', });
lyr_EibCcl_Numeracion_Catastro_3.set('fieldLabels', {'fid': 'hidden field', 'REFCAT': 'inline label - always visible', 'EibCcl_Callejero_eibEntAgp': 'inline label - always visible', 'ENH_CV_00': 'hidden field', 'ENH_N1_00': 'hidden field', 'ENH_L1_00': 'hidden field', 'ENH_MARCA': 'hidden field', 'ENC_CV_00': 'hidden field', 'ENC_N1_00': 'hidden field', 'ENC_L1_00': 'hidden field', 'ENC_MARCA': 'hidden field', 'ENA_CV_00': 'hidden field', 'ENA_N1_00': 'hidden field', 'ENA_L1_00': 'hidden field', 'ENA_MARCA': 'hidden field', 'ENP_CV_00': 'hidden field', 'ENP_N1_00': 'hidden field', 'ENP_L1_00': 'hidden field', 'ENP_MARCA': 'hidden field', 'END_CV_00': 'hidden field', 'END_N1_00': 'inline label - always visible', 'END_L1_00': 'inline label - always visible', 'END_MARCA': 'hidden field', 'EN1_TIPO': 'inline label - always visible', 'EN1_NOMVIA': 'hidden field', 'EN1_PRQ': 'hidden field', 'EN1_SGVIA': 'hidden field', 'Copia_5': 'hidden field', 'Copia_6': 'hidden field', 'Copia_7': 'hidden field', 'Copia_8': 'hidden field', 'DUPLICADOS': 'hidden field', 'rotation': 'hidden field', 'EibCcl_Callejero_eibTipVia': 'inline label - always visible', 'EibCcl_Callejero_eibNomVia': 'inline label - always visible', 'CV_NUM': 'hidden field', 'ID_CV_NA': 'hidden field', 'ID_CV_NP': 'hidden field', 'ID_MODIF': 'inline label - always visible', 'ID_CV_ND': 'hidden field', 'DIRECCION': 'inline label - always visible', });
lyr_EibCcl_Numeracion_Catastro_3.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
