import { Textos } from './es';

export const fr: Textos = {
  // --- general
  app_nombre: 'Comptes de la maison',
  idioma: 'Langue',
  anadir: 'Ajouter',
  cancelar: 'Annuler',
  borrar: 'Supprimer',
  quitar: 'Retirer',
  fecha: 'Date',
  categoria: 'Catégorie',
  concepto: 'Libellé',
  importe: 'Montant',
  origen: 'Provenance',
  mes: 'Mois',
  total: 'Total',
  dia: 'Jour',
  sin_categoria: 'Sans catégorie',
  sin_origen: 'Sans provenance',
  cerrar_aviso: 'Fermer l\u2019avis',
  borrar_aria: 'Supprimer {que}',
  quitar_aria: 'Retirer {que}',

  // --- portada
  portada_cejilla: 'Comptes de la maison · un fichier par an',
  portada_titulo_1: 'Tes comptes',
  portada_titulo_2: 'ne vivent sur',
  portada_titulo_3: 'aucun serveur.',
  portada_entradilla:
    'Tu notes l\u2019essence, les courses, les sorties et les extras au jour le jour ; les charges fixes et les rentrées d\u2019argent sont à part. À la fin du mois tu vois ce que tu as dépensé semaine par semaine et ce qu\u2019il te reste. Le seul endroit où tout cela existe est un fichier .json que tu télécharges et gardes où tu veux.',
  portada_opcion_a: 'Commencer une année',
  portada_opcion_a_ayuda:
    'Crée un carnet vide avec les quatre catégories et les charges fixes habituelles à 0 €.',
  portada_anio: 'Année',
  portada_crear: 'Créer le carnet',
  portada_opcion_b: 'Ouvrir un fichier',
  portada_opcion_b_ayuda:
    'Choisis le finanzas-2026.json téléchargé la dernière fois et reprends où tu en étais.',
  portada_elegir: 'Choisir le fichier JSON',
  portada_leyendo: 'Lecture…',
  portada_detalle_1: 'Pas de compte, pas de mot de passe : rien ne sort de ton navigateur.',
  portada_detalle_2: 'Un fichier par an, pour qu\u2019il ne grossisse pas sans fin.',
  portada_detalle_3:
    'Si tu fermes l\u2019onglet sans télécharger, tout est perdu. L\u2019appli prévient avant.',

  // --- barra y avisos
  estado_sucio: 'Modifications non téléchargées',
  estado_limpio: 'Tout est téléchargé',
  descargar: 'Télécharger {fichero}',
  cerrar_fichero: 'Fermer le fichier',
  aviso_creado: 'Carnet {anio} créé. Télécharge-le quand tu veux l\u2019enregistrer.',
  aviso_descargado: '{fichero} téléchargé.',
  confirmar_cerrar:
    'Tu as des modifications jamais téléchargées, elles seront perdues. Fermer quand même ?',
  confirmar_salir: 'Tu as des modifications que tu n\u2019as pas téléchargées.',
  pie:
    'Rien ne s\u2019enregistre tout seul. Les modifications vivent dans cet onglet jusqu\u2019à ce que tu télécharges {fichero}.',

  // --- cinta de meses
  cinta_aria: 'Mois de l\u2019année',
  cinta_sin_apuntes: 'rien de noté',

  // --- gastos del día
  diarios_titulo: 'Dépenses du quotidien',
  diarios_resumen: '{n} catégories · {total}',
  diarios_concepto_ph: 'Essence, courses de la semaine, verres…',
  diarios_apuntar: 'Noter',
  nueva_categoria: '+ Nouvelle catégorie',
  nueva_categoria_ph: 'Nom de la catégorie',
  rejilla_titulo: 'Répartition par semaine',
  semana_abrev: 'S{n}',
  semana_titulo: 'Semaine {n}',
  semana_dias: 'jours {rango}',
  diarios_vacio:
    'Ce mois-ci n\u2019a pas encore de dépenses. Note la première ci-dessus : date, catégorie et montant.',

  // --- gastos fijos
  fijos_titulo: 'Charges fixes',
  fijos_resumen: '{n} comptées · {total} par mois',
  fijos_intro:
    'Elles se définissent une fois et comptent dans tous les mois de l\u2019année. Décoche-en une pour arrêter de la compter sans perdre la ligne.',
  fijos_col_cuenta: 'Compte',
  fijos_concepto_ph: 'Loyer, Netflix…',
  fijos_total: 'Total par mois',
  fijos_anadir: '+ Ajouter une charge fixe',
  fijos_este: 'cette charge fixe',
  fijos_confirmar_quitar: 'Retirer {que} de tous les mois de l\u2019année ?',
  fijos_contar_aria: 'Compter {que}',

  // --- resumen del mes
  resumen_apuntes: '{n} écritures',
  sello_ahorrado: 'Épargné',
  sello_sobregiro: 'Dans le rouge',
  balance_ingresos: 'Rentrées',
  balance_diarios: 'Dépenses du quotidien',
  balance_fijos: 'Charges fixes',
  balance_total: 'Total dépensé',
  tasa_etiqueta: 'Tu as gardé',
  tasa_ayuda: 'de chaque euro encaissé ce mois-ci.',
  fijos_por_categoria: 'Charges fixes par catégorie',

  // --- gasto por categoria
  categorias_titulo: 'Dépenses par catégorie',
  periodo_mes: 'Ce mois-ci',
  periodo_anio: 'Toute l’année',
  categorias_porcentaje: '% du total',
  categorias_vacio: 'Rien à répartir pour le moment.',
  categorias_nota: 'Le pourcentage porte sur tout ce qui a été dépensé sur la période, charges fixes comprises.',
  categorias_nota_anio: 'Les charges fixes comptent une fois par mois ayant des écritures : {n}.',

  // --- ingresos
  ingresos_titulo: 'Rentrées d\u2019argent',
  ingresos_concepto_ph: 'Salaire de juillet, vente de l\u2019écran…',
  nuevo_origen: '+ Nouvelle provenance',
  nuevo_origen_ph: 'Nom de la provenance',
  ingresos_vacio: 'Aucune rentrée notée ce mois-ci.',
  por_origen: 'Par provenance',

  // --- el año
  anual_titulo: 'L\u2019année en cours',
  anual_resumen: '{n} mois sur 12 avec des écritures',
  anual_diarios: 'Quotidien',
  anual_fijos: 'Fixes',
  anual_ingresos: 'Rentrées',
  anual_ahorro: 'Épargne',
  anual_sin_apuntes: 'rien de noté',
  anual_total: 'Total {anio}',
  anual_nota:
    'Les mois sans aucune écriture restent vides : ils ne traînent pas les charges fixes, pour qu\u2019un mois pas encore commencé n\u2019ait pas l\u2019air d\u2019un mois en perte.',

  // --- errores al apuntar
  error_anio: 'Mets une année entre 2000 et 2100.',
  error_sin_libro: 'Ouvre ou crée un fichier avant de noter quoi que ce soit.',
  error_fecha: 'Mets une date.',
  error_fecha_invalida: 'La date n\u2019est pas valable.',
  error_otro_anio: 'Cette date est de {fecha} et ce fichier est celui de {anio}.',
  error_importe: 'Le montant doit être supérieur à 0.',
  error_nombre_categoria: 'Écris un nom pour la catégorie.',
  error_categoria_existe: 'Cette catégorie existe déjà.',
  error_nombre_origen: 'Écris un nom pour la provenance.',
  error_origen_existe: 'Cette provenance existe déjà.',

  // --- lectura del fichero
  json_lectura_fallida: 'Le fichier n\u2019a pas pu être lu. Réessaie.',
  json_invalido:
    'Ce fichier n\u2019est pas du JSON valable. Ouvre-le dans un éditeur de texte pour voir s\u2019il est coupé.',
  json_no_objeto: 'Le contenu n\u2019est pas un carnet de comptes : un objet JSON était attendu.',
  json_no_es_libro:
    'Ce fichier ne vient pas de Comptes de la maison (la marque "formato" : "{formato}" manque).',
  json_sin_version: 'Le fichier n\u2019indique pas sa version.',
  json_version_futura:
    'Le fichier vient d\u2019une version plus récente (v{version}) que cette application (v{actual}). Mets l\u2019application à jour pour l\u2019ouvrir.',
  json_sin_anio: 'Le fichier n\u2019a pas d\u2019année valable dans le champ "anio".',
  json_sin_categorias:
    'Le fichier n\u2019apportait pas de catégories de dépense : les habituelles ont été mises.',
  json_sin_origenes:
    'Le fichier n\u2019apportait pas de provenances de rentrée : les habituelles ont été mises.',
  json_descartada_1: '1 ligne du fichier n\u2019a pas pu être lue et a été laissée de côté.',
  json_descartadas_n:
    '{n} lignes du fichier n\u2019ont pas pu être lues et ont été laissées de côté.',

  // --- nombres con los que arranca un libro nuevo
  cat_gasolina: 'Essence',
  cat_comida: 'Nourriture',
  cat_ocio: 'Sorties',
  cat_extras: 'Extras',
  ori_nomina: 'Salaire',
  ori_devoluciones: 'Remboursements',
  ori_otros: 'Autres',
  catfijo_vivienda: 'Logement',
  catfijo_suministros: 'Énergie et eau',
  catfijo_suscripciones: 'Abonnements',
  catfijo_salud: 'Santé et sport',
  catfijo_transporte: 'Transports',
  catfijo_otros: 'Autres',
  fijo_alquiler: 'Loyer',
  fijo_internet: 'Internet',
  fijo_luz: 'Électricité',
  fijo_agua: 'Eau',
  fijo_gimnasio: 'Salle de sport'
};
