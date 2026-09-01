import { Textos } from './es';

export const en: Textos = {
  // --- general
  app_nombre: 'House accounts',
  idioma: 'Language',
  anadir: 'Add',
  cancelar: 'Cancel',
  borrar: 'Delete',
  quitar: 'Remove',
  fecha: 'Date',
  categoria: 'Category',
  concepto: 'What for',
  importe: 'Amount',
  origen: 'Source',
  mes: 'Month',
  total: 'Total',
  dia: 'Day',
  sin_categoria: 'No category',
  sin_origen: 'No source',
  cerrar_aviso: 'Dismiss',
  borrar_aria: 'Delete {que}',
  quitar_aria: 'Remove {que}',

  // --- portada
  portada_cejilla: 'House accounts · one file per year',
  portada_titulo_1: 'Your books',
  portada_titulo_2: "don't live on",
  portada_titulo_3: "anyone's server.",
  portada_entradilla:
    'You log fuel, food, fun and one-offs day by day; fixed bills and income go separately. At the end of the month you see what went where, week by week, and what you managed to keep. The only place any of it lives is a .json file you download and keep wherever you like.',
  portada_opcion_a: 'Start a year',
  portada_opcion_a_ayuda:
    'Creates an empty book with the four categories and the usual fixed bills at €0.',
  portada_anio: 'Year',
  portada_crear: 'Create the book',
  portada_opcion_b: 'Open a file',
  portada_opcion_b_ayuda:
    'Pick the finanzas-2026.json you downloaded last time and carry on where you left off.',
  portada_elegir: 'Choose JSON file',
  portada_leyendo: 'Reading…',
  portada_detalle_1: 'No account, no password: nothing leaves your browser.',
  portada_detalle_2: "One file per year, so it doesn't grow out of hand.",
  portada_detalle_3: "Close the tab without downloading and it's gone. You get a warning first.",

  // --- barra y avisos
  estado_sucio: 'Changes not downloaded',
  estado_limpio: 'Everything downloaded',
  descargar: 'Download {fichero}',
  cerrar_fichero: 'Close file',
  aviso_creado: '{anio} book created. Download it whenever you want to save it.',
  aviso_descargado: 'Downloaded {fichero}.',
  confirmar_cerrar: 'You have changes that were never downloaded. Close the file anyway?',
  confirmar_salir: "You have changes you haven't downloaded.",
  pie: 'Nothing saves itself. Your changes live in this tab until you download {fichero}.',

  // --- cinta de meses
  cinta_aria: 'Months of the year',
  cinta_sin_apuntes: 'nothing logged',

  // --- gastos del día
  diarios_titulo: 'Day-to-day spending',
  diarios_resumen: '{n} categories · {total}',
  diarios_concepto_ph: 'Fuel, weekly shop, pints…',
  diarios_apuntar: 'Log it',
  nueva_categoria: '+ New category',
  nueva_categoria_ph: 'Category name',
  rejilla_titulo: 'Week by week',
  semana_abrev: 'W{n}',
  semana_titulo: 'Week {n}',
  semana_dias: 'days {rango}',
  diarios_vacio:
    'Nothing spent this month yet. Log the first one above: date, category and amount.',

  // --- gastos fijos
  fijos_titulo: 'Fixed bills',
  fijos_resumen: '{n} counted · {total} a month',
  fijos_intro:
    'Set these once and they count in every month of the year. Untick one to stop counting it without losing the line.',
  fijos_col_cuenta: 'Counts',
  fijos_concepto_ph: 'Rent, Netflix…',
  fijos_total: 'Monthly total',
  fijos_anadir: '+ Add a fixed bill',
  fijos_este: 'this fixed bill',
  fijos_confirmar_quitar: 'Remove {que} from every month of the year?',
  fijos_contar_aria: 'Count {que}',

  // --- resumen del mes
  resumen_apuntes: '{n} entries',
  sello_ahorrado: 'Saved',
  sello_sobregiro: 'In the red',
  balance_ingresos: 'Income',
  balance_diarios: 'Day-to-day',
  balance_fijos: 'Fixed bills',
  balance_total: 'Total spent',
  tasa_etiqueta: 'You kept',
  tasa_ayuda: 'of every euro that came in this month.',
  fijos_por_categoria: 'Fixed bills by category',

  // --- gasto por categoria
  categorias_titulo: 'Spending by category',
  periodo_mes: 'This month',
  periodo_anio: 'Whole year',
  categorias_porcentaje: '% of total',
  categorias_vacio: 'Nothing spent to break down yet.',
  categorias_nota: 'The percentage is out of everything spent in the period, fixed bills included.',
  categorias_nota_anio: 'Fixed bills count once for each month with entries: {n}.',

  // --- ingresos
  ingresos_titulo: 'Income',
  ingresos_concepto_ph: 'July pay, sold the monitor…',
  nuevo_origen: '+ New source',
  nuevo_origen_ph: 'Source name',
  ingresos_vacio: 'No income logged this month.',
  por_origen: 'By source',

  // --- el año
  anual_titulo: 'The year so far',
  anual_resumen: '{n} of 12 months with entries',
  anual_diarios: 'Day-to-day',
  anual_fijos: 'Fixed',
  anual_ingresos: 'Income',
  anual_ahorro: 'Saved',
  anual_sin_apuntes: 'nothing logged',
  anual_total: '{anio} total',
  anual_nota:
    "Months with no entries at all are left blank: they don't carry the fixed bills, so a month you haven't started yet doesn't look like a month at a loss.",

  // --- errores al apuntar
  error_anio: 'Pick a year between 2000 and 2100.',
  error_sin_libro: 'Open or create a file before logging anything.',
  error_fecha: 'Pick a date.',
  error_fecha_invalida: "That date isn't valid.",
  error_otro_anio: 'That date is from {fecha} and this file is for {anio}.',
  error_importe: 'The amount has to be greater than 0.',
  error_nombre_categoria: 'Type a name for the category.',
  error_categoria_existe: 'That category already exists.',
  error_nombre_origen: 'Type a name for the source.',
  error_origen_existe: 'That source already exists.',

  // --- lectura del fichero
  json_lectura_fallida: "The file couldn't be read. Try again.",
  json_invalido: "This file isn't valid JSON. Open it in a text editor to see if it got cut off.",
  json_no_objeto: "The contents aren't an account book: a JSON object was expected.",
  json_no_es_libro:
    'This file is not from House accounts (the "formato": "{formato}" marker is missing).',
  json_sin_version: "The file doesn't say which version it is.",
  json_version_futura:
    'The file comes from a newer version (v{version}) than this app (v{actual}). Update the app to open it.',
  json_sin_anio: 'The file has no valid year in its "anio" field.',
  json_sin_categorias: 'The file had no spending categories: the usual ones have been set.',
  json_sin_origenes: 'The file had no income sources: the usual ones have been set.',
  json_descartada_1: "1 line of the file couldn't be read and was left out.",
  json_descartadas_n: "{n} lines of the file couldn't be read and were left out.",

  // --- nombres con los que arranca un libro nuevo
  cat_gasolina: 'Fuel',
  cat_comida: 'Food',
  cat_ocio: 'Fun',
  cat_extras: 'One-offs',
  ori_nomina: 'Salary',
  ori_devoluciones: 'Refunds',
  ori_otros: 'Other',
  catfijo_vivienda: 'Housing',
  catfijo_suministros: 'Utilities',
  catfijo_suscripciones: 'Subscriptions',
  catfijo_salud: 'Health and sport',
  catfijo_transporte: 'Transport',
  catfijo_otros: 'Other',
  fijo_alquiler: 'Rent',
  fijo_internet: 'Internet',
  fijo_luz: 'Electricity',
  fijo_agua: 'Water',
  fijo_gimnasio: 'Gym'
};
