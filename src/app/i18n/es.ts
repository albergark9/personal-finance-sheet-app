/**
 * Diccionario español. Es la fuente de las claves: los demás idiomas se
 * declaran como `Textos`, así que si a alguno le falta una clave o le sobra,
 * la compilación falla.
 */
export const es = {
  // --- general
  app_nombre: 'Finanzas de casa',
  idioma: 'Idioma',
  anadir: 'Añadir',
  cancelar: 'Cancelar',
  borrar: 'Borrar',
  quitar: 'Quitar',
  fecha: 'Fecha',
  categoria: 'Categoría',
  concepto: 'Concepto',
  importe: 'Importe',
  origen: 'Origen',
  mes: 'Mes',
  total: 'Total',
  dia: 'Día',
  sin_categoria: 'Sin categoría',
  sin_origen: 'Sin origen',
  cerrar_aviso: 'Cerrar aviso',
  borrar_aria: 'Borrar {que}',
  quitar_aria: 'Quitar {que}',

  // --- portada
  portada_cejilla: 'Cuentas de casa · un fichero por año',
  portada_titulo_1: 'Tus cuentas',
  portada_titulo_2: 'no viven en',
  portada_titulo_3: 'ningún servidor.',
  portada_entradilla:
    'Apuntas gasolina, comida, ocio y extras día a día; los fijos y los ingresos aparte. Al cerrar el mes ves lo que has gastado por semana y lo que te has ahorrado. El único sitio donde queda todo es un fichero .json que descargas tú y guardas donde quieras.',
  portada_opcion_a: 'Empezar un año',
  portada_opcion_a_ayuda:
    'Crea un libro vacío con las cuatro categorías y los gastos fijos de siempre a 0 €.',
  portada_anio: 'Año',
  portada_crear: 'Crear el libro',
  portada_opcion_b: 'Abrir un fichero',
  portada_opcion_b_ayuda:
    'Elige el finanzas-2026.json que descargaste la última vez y sigue donde lo dejaste.',
  portada_elegir: 'Elegir fichero JSON',
  portada_leyendo: 'Leyendo…',
  portada_detalle_1: 'No hay cuenta ni contraseña: nada sale de tu navegador.',
  portada_detalle_2: 'Un fichero por año, para que no crezca sin control.',
  portada_detalle_3: 'Si cierras la pestaña sin descargar, se pierde. La app te avisa antes.',

  // --- barra y avisos
  estado_sucio: 'Cambios sin descargar',
  estado_limpio: 'Todo descargado',
  descargar: 'Descargar {fichero}',
  cerrar_fichero: 'Cerrar fichero',
  aviso_creado: 'Libro de {anio} creado. Descárgalo cuando quieras guardarlo.',
  aviso_descargado: 'Descargado {fichero}.',
  confirmar_cerrar:
    'Tienes cambios sin descargar y se van a perder. ¿Cierras el fichero igualmente?',
  confirmar_salir: 'Tienes cambios que no has descargado.',
  pie: 'Nada se guarda solo. Los cambios viven en esta pestaña hasta que descargas {fichero}.',

  // --- cinta de meses
  cinta_aria: 'Meses del año',
  cinta_sin_apuntes: 'sin apuntes',

  // --- gastos del día
  diarios_titulo: 'Gastos del día',
  diarios_resumen: '{n} categorías · {total}',
  diarios_concepto_ph: 'Repostaje, compra semanal, cañas…',
  diarios_apuntar: 'Apuntar',
  nueva_categoria: '+ Nueva categoría',
  nueva_categoria_ph: 'Nombre de la categoría',
  rejilla_titulo: 'Reparto por semanas',
  semana_abrev: 'S{n}',
  semana_titulo: 'Semana {n}',
  semana_dias: 'días {rango}',
  diarios_vacio:
    'Este mes no tiene gastos todavía. Apunta el primero arriba: fecha, categoría e importe.',

  // --- gastos fijos
  fijos_titulo: 'Gastos fijos',
  fijos_resumen: '{n} activos · {total} al mes',
  fijos_intro:
    'Se definen una vez y cuentan en todos los meses del año. Desmarca uno para dejar de contarlo sin perder la línea.',
  fijos_col_cuenta: 'Cuenta',
  fijos_concepto_ph: 'Alquiler, Netflix…',
  fijos_total: 'Total al mes',
  fijos_anadir: '+ Añadir gasto fijo',
  fijos_este: 'este gasto fijo',
  fijos_confirmar_quitar: '¿Quitar {que} de todos los meses del año?',
  fijos_contar_aria: 'Contar {que}',

  // --- resumen del mes
  resumen_apuntes: '{n} apuntes',
  sello_ahorrado: 'Ahorrado',
  sello_sobregiro: 'En rojo',
  balance_ingresos: 'Ingresos',
  balance_diarios: 'Gastos del día',
  balance_fijos: 'Gastos fijos',
  balance_total: 'Total gastado',
  tasa_etiqueta: 'Te has quedado con',
  tasa_ayuda: 'de cada euro que has ingresado este mes.',
  fijos_por_categoria: 'Fijos por categoría',

  // --- gasto por categoria
  categorias_titulo: 'Gasto por categoría',
  periodo_mes: 'Este mes',
  periodo_anio: 'Todo el año',
  categorias_porcentaje: '% del total',
  categorias_vacio: 'Todavía no hay gastos que repartir.',
  categorias_nota: 'El porcentaje es sobre todo lo gastado en el periodo, fijos incluidos.',
  categorias_nota_anio: 'Los gastos fijos cuentan una vez por cada mes con apuntes: {n}.',

  // --- ingresos
  ingresos_titulo: 'Ingresos',
  ingresos_concepto_ph: 'Nómina de julio, venta del monitor…',
  nuevo_origen: '+ Nuevo origen',
  nuevo_origen_ph: 'Nombre del origen',
  ingresos_vacio: 'Sin ingresos apuntados este mes.',
  por_origen: 'Por origen',

  // --- el año
  anual_titulo: 'El año en curso',
  anual_resumen: '{n} de 12 meses con apuntes',
  anual_diarios: 'Día a día',
  anual_fijos: 'Fijos',
  anual_ingresos: 'Ingresos',
  anual_ahorro: 'Ahorro',
  anual_sin_apuntes: 'sin apuntes',
  anual_total: 'Total {anio}',
  anual_nota:
    'Los meses sin ningún apunte se quedan en blanco: no arrastran los gastos fijos, para que un mes que aún no has empezado no parezca un mes en pérdidas.',

  // --- errores al apuntar
  error_anio: 'Pon un año entre 2000 y 2100.',
  error_sin_libro: 'Abre o crea un fichero antes de apuntar nada.',
  error_fecha: 'Pon una fecha.',
  error_fecha_invalida: 'La fecha no es válida.',
  error_otro_anio: 'Esa fecha es de {fecha} y este fichero es de {anio}.',
  error_importe: 'El importe tiene que ser mayor que 0.',
  error_nombre_categoria: 'Escribe un nombre para la categoría.',
  error_categoria_existe: 'Esa categoría ya existe.',
  error_nombre_origen: 'Escribe un nombre para el origen.',
  error_origen_existe: 'Ese origen ya existe.',

  // --- lectura del fichero
  json_lectura_fallida: 'No se ha podido leer el fichero. Inténtalo otra vez.',
  json_invalido:
    'El fichero no es JSON válido. Ábrelo en un editor de texto para ver si está cortado.',
  json_no_objeto: 'El contenido no es un libro de cuentas: se esperaba un objeto JSON.',
  json_no_es_libro:
    'Este fichero no es de Finanzas de casa (falta la marca "formato": "{formato}").',
  json_sin_version: 'El fichero no indica su versión.',
  json_version_futura:
    'El fichero es de una versión más nueva (v{version}) que esta aplicación (v{actual}). Actualiza la aplicación para abrirlo.',
  json_sin_anio: 'El fichero no tiene un año válido en el campo "anio".',
  json_sin_categorias: 'El fichero no traía categorías de gasto: se han puesto las de siempre.',
  json_sin_origenes: 'El fichero no traía orígenes de ingreso: se han puesto los de siempre.',
  json_descartada_1: '1 línea del fichero no se ha podido leer y se ha dejado fuera.',
  json_descartadas_n: '{n} líneas del fichero no se han podido leer y se han dejado fuera.',

  // --- nombres con los que arranca un libro nuevo
  cat_gasolina: 'Gasolina',
  cat_comida: 'Comida',
  cat_ocio: 'Ocio',
  cat_extras: 'Extras',
  ori_nomina: 'Nómina',
  ori_devoluciones: 'Devoluciones',
  ori_otros: 'Otros',
  catfijo_vivienda: 'Vivienda',
  catfijo_suministros: 'Suministros',
  catfijo_suscripciones: 'Suscripciones',
  catfijo_salud: 'Salud y deporte',
  catfijo_transporte: 'Transporte',
  catfijo_otros: 'Otros',
  fijo_alquiler: 'Alquiler',
  fijo_internet: 'Internet',
  fijo_luz: 'Luz',
  fijo_agua: 'Agua',
  fijo_gimnasio: 'Gimnasio'
};

export type ClaveTexto = keyof typeof es;

/** Todo idioma tiene que traer exactamente estas claves. */
export type Textos = Record<ClaveTexto, string>;
