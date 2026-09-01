import { Textos } from './es';

export const pt: Textos = {
  // --- general
  app_nombre: 'Contas de casa',
  idioma: 'Idioma',
  anadir: 'Adicionar',
  cancelar: 'Cancelar',
  borrar: 'Apagar',
  quitar: 'Remover',
  fecha: 'Data',
  categoria: 'Categoria',
  concepto: 'Descrição',
  importe: 'Valor',
  origen: 'Origem',
  mes: 'Mês',
  total: 'Total',
  dia: 'Dia',
  sin_categoria: 'Sem categoria',
  sin_origen: 'Sem origem',
  cerrar_aviso: 'Fechar aviso',
  borrar_aria: 'Apagar {que}',
  quitar_aria: 'Remover {que}',

  // --- portada
  portada_cejilla: 'Contas de casa · um ficheiro por ano',
  portada_titulo_1: 'As suas contas',
  portada_titulo_2: 'não vivem em',
  portada_titulo_3: 'nenhum servidor.',
  portada_entradilla:
    'Vai apontando combustível, comida, lazer e extras dia a dia; as despesas fixas e as receitas ficam à parte. No fim do mês vê quanto gastou por semana e quanto conseguiu poupar. O único sítio onde tudo isto fica é um ficheiro .json que descarrega e guarda onde quiser.',
  portada_opcion_a: 'Começar um ano',
  portada_opcion_a_ayuda:
    'Cria um livro vazio com as quatro categorias e as despesas fixas habituais a 0 €.',
  portada_anio: 'Ano',
  portada_crear: 'Criar o livro',
  portada_opcion_b: 'Abrir um ficheiro',
  portada_opcion_b_ayuda:
    'Escolha o finanzas-2026.json que descarregou na última vez e continue de onde ficou.',
  portada_elegir: 'Escolher ficheiro JSON',
  portada_leyendo: 'A ler…',
  portada_detalle_1: 'Não há conta nem palavra-passe: nada sai do seu navegador.',
  portada_detalle_2: 'Um ficheiro por ano, para não crescer sem controlo.',
  portada_detalle_3: 'Se fechar o separador sem descarregar, perde-se. A app avisa antes.',

  // --- barra y avisos
  estado_sucio: 'Alterações não descarregadas',
  estado_limpio: 'Tudo descarregado',
  descargar: 'Descarregar {fichero}',
  cerrar_fichero: 'Fechar ficheiro',
  aviso_creado: 'Livro de {anio} criado. Descarregue-o quando quiser guardá-lo.',
  aviso_descargado: 'Descarregado {fichero}.',
  confirmar_cerrar:
    'Tem alterações que nunca descarregou e vão perder-se. Fechar o ficheiro mesmo assim?',
  confirmar_salir: 'Tem alterações que não descarregou.',
  pie:
    'Nada se guarda sozinho. As alterações vivem neste separador até descarregar {fichero}.',

  // --- cinta de meses
  cinta_aria: 'Meses do ano',
  cinta_sin_apuntes: 'sem registos',

  // --- gastos del día
  diarios_titulo: 'Gastos do dia',
  diarios_resumen: '{n} categorias · {total}',
  diarios_concepto_ph: 'Combustível, compras da semana, cervejas…',
  diarios_apuntar: 'Apontar',
  nueva_categoria: '+ Nova categoria',
  nueva_categoria_ph: 'Nome da categoria',
  rejilla_titulo: 'Distribuição por semanas',
  semana_abrev: 'S{n}',
  semana_titulo: 'Semana {n}',
  semana_dias: 'dias {rango}',
  diarios_vacio:
    'Este mês ainda não tem gastos. Aponte o primeiro acima: data, categoria e valor.',

  // --- gastos fijos
  fijos_titulo: 'Despesas fixas',
  fijos_resumen: '{n} activas · {total} por mês',
  fijos_intro:
    'Definem-se uma vez e contam em todos os meses do ano. Desmarque uma para deixar de a contar sem perder a linha.',
  fijos_col_cuenta: 'Conta',
  fijos_concepto_ph: 'Renda, Netflix…',
  fijos_total: 'Total por mês',
  fijos_anadir: '+ Adicionar despesa fixa',
  fijos_este: 'esta despesa fixa',
  fijos_confirmar_quitar: 'Remover {que} de todos os meses do ano?',
  fijos_contar_aria: 'Contar {que}',

  // --- resumen del mes
  resumen_apuntes: '{n} registos',
  sello_ahorrado: 'Poupado',
  sello_sobregiro: 'No vermelho',
  balance_ingresos: 'Receitas',
  balance_diarios: 'Gastos do dia',
  balance_fijos: 'Despesas fixas',
  balance_total: 'Total gasto',
  tasa_etiqueta: 'Ficou com',
  tasa_ayuda: 'de cada euro que recebeu este mês.',
  fijos_por_categoria: 'Fixas por categoria',

  // --- gasto por categoria
  categorias_titulo: 'Gasto por categoria',
  periodo_mes: 'Este mês',
  periodo_anio: 'Todo o ano',
  categorias_porcentaje: '% do total',
  categorias_vacio: 'Ainda não há gastos para repartir.',
  categorias_nota: 'A percentagem é sobre tudo o que se gastou no período, despesas fixas incluídas.',
  categorias_nota_anio: 'As despesas fixas contam uma vez por cada mês com registos: {n}.',

  // --- ingresos
  ingresos_titulo: 'Receitas',
  ingresos_concepto_ph: 'Salário de julho, venda do monitor…',
  nuevo_origen: '+ Nova origem',
  nuevo_origen_ph: 'Nome da origem',
  ingresos_vacio: 'Sem receitas apontadas este mês.',
  por_origen: 'Por origem',

  // --- el año
  anual_titulo: 'O ano em curso',
  anual_resumen: '{n} de 12 meses com registos',
  anual_diarios: 'Dia a dia',
  anual_fijos: 'Fixas',
  anual_ingresos: 'Receitas',
  anual_ahorro: 'Poupança',
  anual_sin_apuntes: 'sem registos',
  anual_total: 'Total {anio}',
  anual_nota:
    'Os meses sem nenhum registo ficam em branco: não arrastam as despesas fixas, para que um mês que ainda não começou não pareça um mês em prejuízo.',

  // --- errores al apuntar
  error_anio: 'Indique um ano entre 2000 e 2100.',
  error_sin_libro: 'Abra ou crie um ficheiro antes de apontar algo.',
  error_fecha: 'Indique uma data.',
  error_fecha_invalida: 'A data não é válida.',
  error_otro_anio: 'Essa data é de {fecha} e este ficheiro é de {anio}.',
  error_importe: 'O valor tem de ser maior do que 0.',
  error_nombre_categoria: 'Escreva um nome para a categoria.',
  error_categoria_existe: 'Essa categoria já existe.',
  error_nombre_origen: 'Escreva um nome para a origem.',
  error_origen_existe: 'Essa origem já existe.',

  // --- lectura del fichero
  json_lectura_fallida: 'Não foi possível ler o ficheiro. Tente outra vez.',
  json_invalido:
    'O ficheiro não é JSON válido. Abra-o num editor de texto para ver se ficou cortado.',
  json_no_objeto: 'O conteúdo não é um livro de contas: esperava-se um objecto JSON.',
  json_no_es_libro:
    'Este ficheiro não é do Contas de casa (falta a marca "formato": "{formato}").',
  json_sin_version: 'O ficheiro não indica a sua versão.',
  json_version_futura:
    'O ficheiro é de uma versão mais recente (v{version}) do que esta aplicação (v{actual}). Actualize a aplicação para o abrir.',
  json_sin_anio: 'O ficheiro não tem um ano válido no campo "anio".',
  json_sin_categorias: 'O ficheiro não trazia categorias de gasto: foram postas as habituais.',
  json_sin_origenes: 'O ficheiro não trazia origens de receita: foram postas as habituais.',
  json_descartada_1: 'Não foi possível ler 1 linha do ficheiro e ficou de fora.',
  json_descartadas_n: 'Não foi possível ler {n} linhas do ficheiro e ficaram de fora.',

  // --- nombres con los que arranca un libro nuevo
  cat_gasolina: 'Combustível',
  cat_comida: 'Comida',
  cat_ocio: 'Lazer',
  cat_extras: 'Extras',
  ori_nomina: 'Salário',
  ori_devoluciones: 'Reembolsos',
  ori_otros: 'Outros',
  catfijo_vivienda: 'Habitação',
  catfijo_suministros: 'Água e energia',
  catfijo_suscripciones: 'Subscrições',
  catfijo_salud: 'Saúde e desporto',
  catfijo_transporte: 'Transportes',
  catfijo_otros: 'Outros',
  fijo_alquiler: 'Renda',
  fijo_internet: 'Internet',
  fijo_luz: 'Electricidade',
  fijo_agua: 'Água',
  fijo_gimnasio: 'Ginásio'
};
