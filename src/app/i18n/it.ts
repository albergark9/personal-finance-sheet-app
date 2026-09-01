import { Textos } from './es';

export const it: Textos = {
  // --- general
  app_nombre: 'Conti di casa',
  idioma: 'Lingua',
  anadir: 'Aggiungi',
  cancelar: 'Annulla',
  borrar: 'Elimina',
  quitar: 'Rimuovi',
  fecha: 'Data',
  categoria: 'Categoria',
  concepto: 'Descrizione',
  importe: 'Importo',
  origen: 'Provenienza',
  mes: 'Mese',
  total: 'Totale',
  dia: 'Giorno',
  sin_categoria: 'Senza categoria',
  sin_origen: 'Senza provenienza',
  cerrar_aviso: 'Chiudi avviso',
  borrar_aria: 'Elimina {que}',
  quitar_aria: 'Rimuovi {que}',

  // --- portada
  portada_cejilla: 'Conti di casa · un file per anno',
  portada_titulo_1: 'I tuoi conti',
  portada_titulo_2: 'non vivono su',
  portada_titulo_3: 'nessun server.',
  portada_entradilla:
    'Segni benzina, spesa, tempo libero ed extra giorno per giorno; le spese fisse e le entrate stanno a parte. A fine mese vedi quanto hai speso settimana per settimana e quanto ti è rimasto. L\u2019unico posto dove resta tutto è un file .json che scarichi tu e tieni dove vuoi.',
  portada_opcion_a: 'Iniziare un anno',
  portada_opcion_a_ayuda:
    'Crea un registro vuoto con le quattro categorie e le solite spese fisse a 0 €.',
  portada_anio: 'Anno',
  portada_crear: 'Crea il registro',
  portada_opcion_b: 'Aprire un file',
  portada_opcion_b_ayuda:
    'Scegli il finanzas-2026.json che hai scaricato l\u2019ultima volta e riprendi da dove eri.',
  portada_elegir: 'Scegli il file JSON',
  portada_leyendo: 'Lettura…',
  portada_detalle_1: 'Nessun account, nessuna password: niente esce dal tuo browser.',
  portada_detalle_2: 'Un file per anno, così non cresce fuori controllo.',
  portada_detalle_3: 'Se chiudi la scheda senza scaricare, si perde. L\u2019app ti avvisa prima.',

  // --- barra y avisos
  estado_sucio: 'Modifiche non scaricate',
  estado_limpio: 'Tutto scaricato',
  descargar: 'Scarica {fichero}',
  cerrar_fichero: 'Chiudi file',
  aviso_creado: 'Registro {anio} creato. Scaricalo quando vuoi salvarlo.',
  aviso_descargado: 'Scaricato {fichero}.',
  confirmar_cerrar: 'Hai modifiche che non hai mai scaricato e andranno perse. Chiudo comunque?',
  confirmar_salir: 'Hai modifiche che non hai scaricato.',
  pie: 'Niente si salva da solo. Le modifiche vivono in questa scheda finché non scarichi {fichero}.',

  // --- cinta de meses
  cinta_aria: 'Mesi dell\u2019anno',
  cinta_sin_apuntes: 'nessuna voce',

  // --- gastos del día
  diarios_titulo: 'Spese di tutti i giorni',
  diarios_resumen: '{n} categorie · {total}',
  diarios_concepto_ph: 'Benzina, spesa settimanale, birre…',
  diarios_apuntar: 'Segna',
  nueva_categoria: '+ Nuova categoria',
  nueva_categoria_ph: 'Nome della categoria',
  rejilla_titulo: 'Ripartizione per settimane',
  semana_abrev: 'S{n}',
  semana_titulo: 'Settimana {n}',
  semana_dias: 'giorni {rango}',
  diarios_vacio:
    'Questo mese non ha ancora spese. Segna la prima qui sopra: data, categoria e importo.',

  // --- gastos fijos
  fijos_titulo: 'Spese fisse',
  fijos_resumen: '{n} attive · {total} al mese',
  fijos_intro:
    'Si impostano una volta e contano in tutti i mesi dell\u2019anno. Togli la spunta per non contarne una senza perdere la riga.',
  fijos_col_cuenta: 'Conta',
  fijos_concepto_ph: 'Affitto, Netflix…',
  fijos_total: 'Totale al mese',
  fijos_anadir: '+ Aggiungi spesa fissa',
  fijos_este: 'questa spesa fissa',
  fijos_confirmar_quitar: 'Rimuovo {que} da tutti i mesi dell\u2019anno?',
  fijos_contar_aria: 'Conta {que}',

  // --- resumen del mes
  resumen_apuntes: '{n} voci',
  sello_ahorrado: 'Risparmiato',
  sello_sobregiro: 'In rosso',
  balance_ingresos: 'Entrate',
  balance_diarios: 'Spese quotidiane',
  balance_fijos: 'Spese fisse',
  balance_total: 'Totale speso',
  tasa_etiqueta: 'Ti è rimasto',
  tasa_ayuda: 'di ogni euro incassato questo mese.',
  fijos_por_categoria: 'Fisse per categoria',

  // --- gasto por categoria
  categorias_titulo: 'Spesa per categoria',
  periodo_mes: 'Questo mese',
  periodo_anio: 'Tutto l’anno',
  categorias_porcentaje: '% del totale',
  categorias_vacio: 'Non c’è ancora niente da ripartire.',
  categorias_nota: 'La percentuale è su tutto quello speso nel periodo, spese fisse incluse.',
  categorias_nota_anio: 'Le spese fisse contano una volta per ogni mese con voci: {n}.',

  // --- ingresos
  ingresos_titulo: 'Entrate',
  ingresos_concepto_ph: 'Stipendio di luglio, vendita del monitor…',
  nuevo_origen: '+ Nuova provenienza',
  nuevo_origen_ph: 'Nome della provenienza',
  ingresos_vacio: 'Nessuna entrata segnata questo mese.',
  por_origen: 'Per provenienza',

  // --- el año
  anual_titulo: 'L\u2019anno in corso',
  anual_resumen: '{n} di 12 mesi con voci',
  anual_diarios: 'Quotidiane',
  anual_fijos: 'Fisse',
  anual_ingresos: 'Entrate',
  anual_ahorro: 'Risparmio',
  anual_sin_apuntes: 'nessuna voce',
  anual_total: 'Totale {anio}',
  anual_nota:
    'I mesi senza nessuna voce restano in bianco: non si portano dietro le spese fisse, così un mese che non hai ancora iniziato non sembra un mese in perdita.',

  // --- errores al apuntar
  error_anio: 'Metti un anno tra 2000 e 2100.',
  error_sin_libro: 'Apri o crea un file prima di segnare qualcosa.',
  error_fecha: 'Metti una data.',
  error_fecha_invalida: 'La data non è valida.',
  error_otro_anio: 'Quella data è del {fecha} e questo file è del {anio}.',
  error_importe: 'L\u2019importo deve essere maggiore di 0.',
  error_nombre_categoria: 'Scrivi un nome per la categoria.',
  error_categoria_existe: 'Quella categoria esiste già.',
  error_nombre_origen: 'Scrivi un nome per la provenienza.',
  error_origen_existe: 'Quella provenienza esiste già.',

  // --- lectura del fichero
  json_lectura_fallida: 'Non è stato possibile leggere il file. Riprova.',
  json_invalido:
    'Il file non è JSON valido. Aprilo in un editor di testo per vedere se è troncato.',
  json_no_objeto: 'Il contenuto non è un registro di conti: si aspettava un oggetto JSON.',
  json_no_es_libro:
    'Questo file non è di Conti di casa (manca il contrassegno "formato": "{formato}").',
  json_sin_version: 'Il file non indica la sua versione.',
  json_version_futura:
    'Il file è di una versione più recente (v{version}) di questa applicazione (v{actual}). Aggiorna l\u2019applicazione per aprirlo.',
  json_sin_anio: 'Il file non ha un anno valido nel campo "anio".',
  json_sin_categorias: 'Il file non portava categorie di spesa: sono state messe quelle solite.',
  json_sin_origenes: 'Il file non portava provenienze di entrata: sono state messe quelle solite.',
  json_descartada_1: '1 riga del file non si è potuta leggere ed è stata lasciata fuori.',
  json_descartadas_n: '{n} righe del file non si sono potute leggere e sono state lasciate fuori.',

  // --- nombres con los que arranca un libro nuevo
  cat_gasolina: 'Benzina',
  cat_comida: 'Cibo',
  cat_ocio: 'Tempo libero',
  cat_extras: 'Extra',
  ori_nomina: 'Stipendio',
  ori_devoluciones: 'Rimborsi',
  ori_otros: 'Altro',
  catfijo_vivienda: 'Casa',
  catfijo_suministros: 'Utenze',
  catfijo_suscripciones: 'Abbonamenti',
  catfijo_salud: 'Salute e sport',
  catfijo_transporte: 'Trasporti',
  catfijo_otros: 'Altro',
  fijo_alquiler: 'Affitto',
  fijo_internet: 'Internet',
  fijo_luz: 'Luce',
  fijo_agua: 'Acqua',
  fijo_gimnasio: 'Palestra'
};
