import { Textos } from './es';

export const ru: Textos = {
  // --- general
  app_nombre: 'Домашние счета',
  idioma: 'Язык',
  anadir: 'Добавить',
  cancelar: 'Отмена',
  borrar: 'Удалить',
  quitar: 'Убрать',
  fecha: 'Дата',
  categoria: 'Категория',
  concepto: 'Назначение',
  importe: 'Сумма',
  origen: 'Источник',
  mes: 'Месяц',
  total: 'Итого',
  dia: 'День',
  sin_categoria: 'Без категории',
  sin_origen: 'Без источника',
  cerrar_aviso: 'Закрыть сообщение',
  borrar_aria: 'Удалить: {que}',
  quitar_aria: 'Убрать: {que}',

  // --- portada
  portada_cejilla: 'Домашние счета · один файл на год',
  portada_titulo_1: 'Твои записи',
  portada_titulo_2: 'не хранятся',
  portada_titulo_3: 'ни на одном сервере.',
  portada_entradilla:
    'Каждый день записываешь бензин, еду, развлечения и разовые траты; постоянные расходы и доходы — отдельно. В конце месяца видно, сколько ушло по неделям и сколько удалось отложить. Всё это существует только в файле .json, который ты скачиваешь и держишь там, где хочешь.',
  portada_opcion_a: 'Начать год',
  portada_opcion_a_ayuda:
    'Создаёт пустую книгу с четырьмя категориями и обычными постоянными расходами по 0 €.',
  portada_anio: 'Год',
  portada_crear: 'Создать книгу',
  portada_opcion_b: 'Открыть файл',
  portada_opcion_b_ayuda:
    'Выбери finanzas-2026.json, скачанный в прошлый раз, и продолжай с того же места.',
  portada_elegir: 'Выбрать файл JSON',
  portada_leyendo: 'Читаю…',
  portada_detalle_1: 'Ни аккаунта, ни пароля: ничего не уходит из браузера.',
  portada_detalle_2: 'Один файл на год, чтобы он не разрастался без конца.',
  portada_detalle_3:
    'Закроешь вкладку, не скачав, — всё пропадёт. Приложение предупредит заранее.',

  // --- barra y avisos
  estado_sucio: 'Изменения не скачаны',
  estado_limpio: 'Всё скачано',
  descargar: 'Скачать {fichero}',
  cerrar_fichero: 'Закрыть файл',
  aviso_creado: 'Книга за {anio} создана. Скачай её, когда захочешь сохранить.',
  aviso_descargado: 'Скачано: {fichero}.',
  confirmar_cerrar: 'Есть изменения, которые ты не скачал, они потеряются. Всё равно закрыть файл?',
  confirmar_salir: 'Есть изменения, которые ты не скачал.',
  pie:
    'Само ничего не сохраняется. Изменения живут в этой вкладке, пока ты не скачаешь {fichero}.',

  // --- cinta de meses
  cinta_aria: 'Месяцы года',
  cinta_sin_apuntes: 'нет записей',

  // --- gastos del día
  diarios_titulo: 'Ежедневные траты',
  diarios_resumen: 'категорий: {n} · {total}',
  diarios_concepto_ph: 'Бензин, продукты на неделю, кофе…',
  diarios_apuntar: 'Записать',
  nueva_categoria: '+ Новая категория',
  nueva_categoria_ph: 'Название категории',
  rejilla_titulo: 'Разбивка по неделям',
  semana_abrev: 'Н{n}',
  semana_titulo: 'Неделя {n}',
  semana_dias: 'дни {rango}',
  diarios_vacio:
    'В этом месяце трат пока нет. Запиши первую выше: дата, категория и сумма.',

  // --- gastos fijos
  fijos_titulo: 'Постоянные расходы',
  fijos_resumen: 'учитывается: {n} · {total} в месяц',
  fijos_intro:
    'Задаются один раз и учитываются в каждом месяце года. Сними галочку, чтобы перестать учитывать расход, не удаляя строку.',
  fijos_col_cuenta: 'Учёт',
  fijos_concepto_ph: 'Аренда, Netflix…',
  fijos_total: 'Итого в месяц',
  fijos_anadir: '+ Добавить постоянный расход',
  fijos_este: 'этот постоянный расход',
  fijos_confirmar_quitar: 'Убрать «{que}» из всех месяцев года?',
  fijos_contar_aria: 'Учитывать: {que}',

  // --- resumen del mes
  resumen_apuntes: 'записей: {n}',
  sello_ahorrado: 'Отложено',
  sello_sobregiro: 'Минус',
  balance_ingresos: 'Доходы',
  balance_diarios: 'Ежедневные траты',
  balance_fijos: 'Постоянные расходы',
  balance_total: 'Всего потрачено',
  tasa_etiqueta: 'У тебя осталось',
  tasa_ayuda: 'с каждого евро, полученного в этом месяце.',
  fijos_por_categoria: 'Постоянные по категориям',

  // --- gasto por categoria
  categorias_titulo: 'Траты по категориям',
  periodo_mes: 'Этот месяц',
  periodo_anio: 'Весь год',
  categorias_porcentaje: '% от всего',
  categorias_vacio: 'Пока нечего распределять.',
  categorias_nota: 'Проценты считаются от всех трат за период, включая постоянные расходы.',
  categorias_nota_anio: 'Постоянные расходы учитываются по одному разу за каждый месяц с записями: {n}.',

  // --- ingresos
  ingresos_titulo: 'Доходы',
  ingresos_concepto_ph: 'Зарплата за июль, продал монитор…',
  nuevo_origen: '+ Новый источник',
  nuevo_origen_ph: 'Название источника',
  ingresos_vacio: 'В этом месяце доходов не записано.',
  por_origen: 'По источникам',

  // --- el año
  anual_titulo: 'Текущий год',
  anual_resumen: 'месяцев с записями: {n} из 12',
  anual_diarios: 'Ежедневные',
  anual_fijos: 'Постоянные',
  anual_ingresos: 'Доходы',
  anual_ahorro: 'Отложено',
  anual_sin_apuntes: 'нет записей',
  anual_total: 'Итого за {anio}',
  anual_nota:
    'Месяцы совсем без записей остаются пустыми: постоянные расходы в них не тянутся, чтобы месяц, который ещё не начался, не выглядел убыточным.',

  // --- errores al apuntar
  error_anio: 'Укажи год от 2000 до 2100.',
  error_sin_libro: 'Сначала открой или создай файл, потом записывай.',
  error_fecha: 'Укажи дату.',
  error_fecha_invalida: 'Дата неверная.',
  error_otro_anio: 'Эта дата относится к {fecha}, а файл — за {anio}.',
  error_importe: 'Сумма должна быть больше 0.',
  error_nombre_categoria: 'Напиши название категории.',
  error_categoria_existe: 'Такая категория уже есть.',
  error_nombre_origen: 'Напиши название источника.',
  error_origen_existe: 'Такой источник уже есть.',

  // --- lectura del fichero
  json_lectura_fallida: 'Не удалось прочитать файл. Попробуй ещё раз.',
  json_invalido:
    'Файл не является корректным JSON. Открой его в текстовом редакторе и посмотри, не обрезан ли он.',
  json_no_objeto: 'Содержимое не похоже на книгу счетов: ожидался объект JSON.',
  json_no_es_libro:
    'Этот файл не от «Домашних счетов» (нет метки "formato": "{formato}").',
  json_sin_version: 'В файле не указана версия.',
  json_version_futura:
    'Файл из более новой версии (v{version}), чем это приложение (v{actual}). Обнови приложение, чтобы открыть его.',
  json_sin_anio: 'В поле "anio" файла нет корректного года.',
  json_sin_categorias: 'В файле не было категорий трат: поставлены обычные.',
  json_sin_origenes: 'В файле не было источников доходов: поставлены обычные.',
  json_descartada_1: '1 строку файла прочитать не удалось, она пропущена.',
  json_descartadas_n: 'Строк файла прочитать не удалось: {n}. Они пропущены.',

  // --- nombres con los que arranca un libro nuevo
  cat_gasolina: 'Бензин',
  cat_comida: 'Еда',
  cat_ocio: 'Развлечения',
  cat_extras: 'Разное',
  ori_nomina: 'Зарплата',
  ori_devoluciones: 'Возвраты',
  ori_otros: 'Прочее',
  catfijo_vivienda: 'Жильё',
  catfijo_suministros: 'Коммунальные',
  catfijo_suscripciones: 'Подписки',
  catfijo_salud: 'Здоровье и спорт',
  catfijo_transporte: 'Транспорт',
  catfijo_otros: 'Прочее',
  fijo_alquiler: 'Аренда',
  fijo_internet: 'Интернет',
  fijo_luz: 'Электричество',
  fijo_agua: 'Вода',
  fijo_gimnasio: 'Спортзал'
};
