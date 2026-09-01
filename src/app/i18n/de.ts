import { Textos } from './es';

export const de: Textos = {
  // --- general
  app_nombre: 'Haushaltskasse',
  idioma: 'Sprache',
  anadir: 'Hinzufügen',
  cancelar: 'Abbrechen',
  borrar: 'Löschen',
  quitar: 'Entfernen',
  fecha: 'Datum',
  categoria: 'Kategorie',
  concepto: 'Wofür',
  importe: 'Betrag',
  origen: 'Quelle',
  mes: 'Monat',
  total: 'Summe',
  dia: 'Tag',
  sin_categoria: 'Ohne Kategorie',
  sin_origen: 'Ohne Quelle',
  cerrar_aviso: 'Hinweis schließen',
  borrar_aria: '{que} löschen',
  quitar_aria: '{que} entfernen',

  // --- portada
  portada_cejilla: 'Haushaltskasse · eine Datei pro Jahr',
  portada_titulo_1: 'Deine Zahlen',
  portada_titulo_2: 'liegen auf',
  portada_titulo_3: 'keinem Server.',
  portada_entradilla:
    'Du trägst Tanken, Essen, Freizeit und Extras Tag für Tag ein; Festkosten und Einnahmen stehen getrennt. Am Monatsende siehst du, was pro Woche draufgegangen ist und was übrig geblieben ist. Das alles existiert nur in einer .json-Datei, die du herunterlädst und dort aufbewahrst, wo du willst.',
  portada_opcion_a: 'Jahr anfangen',
  portada_opcion_a_ayuda:
    'Legt ein leeres Buch an, mit den vier Kategorien und den üblichen Festkosten auf 0 €.',
  portada_anio: 'Jahr',
  portada_crear: 'Buch anlegen',
  portada_opcion_b: 'Datei öffnen',
  portada_opcion_b_ayuda:
    'Wähle die finanzas-2026.json, die du letztes Mal heruntergeladen hast, und mach da weiter.',
  portada_elegir: 'JSON-Datei wählen',
  portada_leyendo: 'Wird gelesen…',
  portada_detalle_1: 'Kein Konto, kein Passwort: nichts verlässt deinen Browser.',
  portada_detalle_2: 'Eine Datei pro Jahr, damit sie nicht endlos wächst.',
  portada_detalle_3:
    'Schließt du den Tab ohne Download, ist alles weg. Die App warnt dich vorher.',

  // --- barra y avisos
  estado_sucio: 'Änderungen nicht heruntergeladen',
  estado_limpio: 'Alles heruntergeladen',
  descargar: '{fichero} herunterladen',
  cerrar_fichero: 'Datei schließen',
  aviso_creado: 'Buch für {anio} angelegt. Lade es herunter, wenn du es sichern willst.',
  aviso_descargado: '{fichero} heruntergeladen.',
  confirmar_cerrar:
    'Du hast Änderungen, die nie heruntergeladen wurden, sie gehen verloren. Datei trotzdem schließen?',
  confirmar_salir: 'Du hast Änderungen, die du nicht heruntergeladen hast.',
  pie:
    'Nichts speichert sich von selbst. Die Änderungen leben in diesem Tab, bis du {fichero} herunterlädst.',

  // --- cinta de meses
  cinta_aria: 'Monate des Jahres',
  cinta_sin_apuntes: 'nichts eingetragen',

  // --- gastos del día
  diarios_titulo: 'Ausgaben des Tages',
  diarios_resumen: '{n} Kategorien · {total}',
  diarios_concepto_ph: 'Tanken, Wocheneinkauf, Feierabendbier…',
  diarios_apuntar: 'Eintragen',
  nueva_categoria: '+ Neue Kategorie',
  nueva_categoria_ph: 'Name der Kategorie',
  rejilla_titulo: 'Aufteilung nach Wochen',
  semana_abrev: 'W{n}',
  semana_titulo: 'Woche {n}',
  semana_dias: 'Tage {rango}',
  diarios_vacio:
    'Dieser Monat hat noch keine Ausgaben. Trage oben die erste ein: Datum, Kategorie und Betrag.',

  // --- gastos fijos
  fijos_titulo: 'Festkosten',
  fijos_resumen: '{n} aktiv · {total} pro Monat',
  fijos_intro:
    'Werden einmal festgelegt und zählen in jedem Monat des Jahres. Häkchen weg, und eine Position zählt nicht mehr, ohne dass die Zeile verloren geht.',
  fijos_col_cuenta: 'Zählt',
  fijos_concepto_ph: 'Miete, Netflix…',
  fijos_total: 'Summe pro Monat',
  fijos_anadir: '+ Festkosten hinzufügen',
  fijos_este: 'diese Festkosten',
  fijos_confirmar_quitar: '{que} aus allen Monaten des Jahres entfernen?',
  fijos_contar_aria: '{que} zählen',

  // --- resumen del mes
  resumen_apuntes: '{n} Einträge',
  sello_ahorrado: 'Gespart',
  sello_sobregiro: 'Im Minus',
  balance_ingresos: 'Einnahmen',
  balance_diarios: 'Ausgaben des Tages',
  balance_fijos: 'Festkosten',
  balance_total: 'Insgesamt ausgegeben',
  tasa_etiqueta: 'Behalten hast du',
  tasa_ayuda: 'von jedem Euro, der diesen Monat reingekommen ist.',
  fijos_por_categoria: 'Festkosten nach Kategorie',

  // --- gasto por categoria
  categorias_titulo: 'Ausgaben nach Kategorie',
  periodo_mes: 'Dieser Monat',
  periodo_anio: 'Ganzes Jahr',
  categorias_porcentaje: '% vom Ganzen',
  categorias_vacio: 'Noch nichts da, was sich aufteilen ließe.',
  categorias_nota: 'Der Prozentsatz bezieht sich auf alles, was im Zeitraum ausgegeben wurde, Festkosten inbegriffen.',
  categorias_nota_anio: 'Festkosten zählen einmal für jeden Monat mit Einträgen: {n}.',

  // --- ingresos
  ingresos_titulo: 'Einnahmen',
  ingresos_concepto_ph: 'Juli-Gehalt, Monitor verkauft…',
  nuevo_origen: '+ Neue Quelle',
  nuevo_origen_ph: 'Name der Quelle',
  ingresos_vacio: 'Diesen Monat keine Einnahmen eingetragen.',
  por_origen: 'Nach Quelle',

  // --- el año
  anual_titulo: 'Das laufende Jahr',
  anual_resumen: '{n} von 12 Monaten mit Einträgen',
  anual_diarios: 'Tägliches',
  anual_fijos: 'Fest',
  anual_ingresos: 'Einnahmen',
  anual_ahorro: 'Gespart',
  anual_sin_apuntes: 'nichts eingetragen',
  anual_total: 'Summe {anio}',
  anual_nota:
    'Monate ohne jeden Eintrag bleiben leer: sie schleppen die Festkosten nicht mit, damit ein Monat, den du noch nicht angefangen hast, nicht wie ein Verlustmonat aussieht.',

  // --- errores al apuntar
  error_anio: 'Nimm ein Jahr zwischen 2000 und 2100.',
  error_sin_libro: 'Öffne oder lege eine Datei an, bevor du etwas einträgst.',
  error_fecha: 'Gib ein Datum an.',
  error_fecha_invalida: 'Das Datum ist ungültig.',
  error_otro_anio: 'Dieses Datum ist von {fecha}, und diese Datei ist die von {anio}.',
  error_importe: 'Der Betrag muss größer als 0 sein.',
  error_nombre_categoria: 'Schreib einen Namen für die Kategorie.',
  error_categoria_existe: 'Diese Kategorie gibt es schon.',
  error_nombre_origen: 'Schreib einen Namen für die Quelle.',
  error_origen_existe: 'Diese Quelle gibt es schon.',

  // --- lectura del fichero
  json_lectura_fallida: 'Die Datei konnte nicht gelesen werden. Versuch es nochmal.',
  json_invalido:
    'Die Datei ist kein gültiges JSON. Öffne sie in einem Texteditor und schau, ob sie abgeschnitten ist.',
  json_no_objeto: 'Der Inhalt ist kein Kassenbuch: erwartet wurde ein JSON-Objekt.',
  json_no_es_libro:
    'Diese Datei kommt nicht von der Haushaltskasse (die Kennung "formato": "{formato}" fehlt).',
  json_sin_version: 'Die Datei nennt ihre Version nicht.',
  json_version_futura:
    'Die Datei stammt aus einer neueren Version (v{version}) als diese Anwendung (v{actual}). Aktualisiere die Anwendung, um sie zu öffnen.',
  json_sin_anio: 'Die Datei hat kein gültiges Jahr im Feld "anio".',
  json_sin_categorias:
    'Die Datei brachte keine Ausgabenkategorien mit: es wurden die üblichen gesetzt.',
  json_sin_origenes:
    'Die Datei brachte keine Einnahmequellen mit: es wurden die üblichen gesetzt.',
  json_descartada_1: '1 Zeile der Datei war nicht lesbar und wurde ausgelassen.',
  json_descartadas_n: '{n} Zeilen der Datei waren nicht lesbar und wurden ausgelassen.',

  // --- nombres con los que arranca un libro nuevo
  cat_gasolina: 'Tanken',
  cat_comida: 'Essen',
  cat_ocio: 'Freizeit',
  cat_extras: 'Extras',
  ori_nomina: 'Gehalt',
  ori_devoluciones: 'Rückzahlungen',
  ori_otros: 'Sonstiges',
  catfijo_vivienda: 'Wohnen',
  catfijo_suministros: 'Strom und Wasser',
  catfijo_suscripciones: 'Abos',
  catfijo_salud: 'Gesundheit und Sport',
  catfijo_transporte: 'Verkehr',
  catfijo_otros: 'Sonstiges',
  fijo_alquiler: 'Miete',
  fijo_internet: 'Internet',
  fijo_luz: 'Strom',
  fijo_agua: 'Wasser',
  fijo_gimnasio: 'Fitnessstudio'
};
