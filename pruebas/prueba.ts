/**
 * Comprobaciones sin navegador: cálculos, manejo del fichero y diccionarios.
 * Se ejecuta con `npm run comprobar`. No importa nada de Angular a propósito,
 * así que corre con cualquier versión de node.
 */

import { ClaveTexto, es } from '../src/app/i18n/es';
import { DICCIONARIOS, IDIOMAS, detectarIdioma, esIdioma } from '../src/app/i18n/idiomas';
import {
  LibroAnual,
  NombresIniciales,
  libroNuevo,
  nuevoId
} from '../src/app/modelos/libro.modelo';
import {
  calcularGastoPorCategoria,
  calcularResumenAnual,
  calcularResumenMes,
  indiceSemana
} from '../src/app/servicios/calculos';
import {
  libroDesdeTexto,
  nombreFicheroLibro,
  serializarLibro
} from '../src/app/servicios/libro-json';

let fallos = 0;
function comprobar(nombre: string, real: unknown, esperado: unknown): void {
  const ok = JSON.stringify(real) === JSON.stringify(esperado);
  if (!ok) {
    fallos++;
    console.log(
      'FALLO ' + nombre + ': ' + JSON.stringify(real) + ' != ' + JSON.stringify(esperado)
    );
  } else {
    console.log('ok   ' + nombre + ' -> ' + JSON.stringify(real));
  }
}

/** Los nombres iniciales en español, como los construye TraduccionService. */
const NOMBRES_ES: NombresIniciales = {
  categorias: [es.cat_gasolina, es.cat_comida, es.cat_ocio, es.cat_extras],
  origenes: [es.ori_nomina, 'Wallapop', 'BlaBlaCar', 'Bizum', es.ori_devoluciones, es.ori_otros],
  categoriasFijos: [
    es.catfijo_vivienda,
    es.catfijo_suministros,
    es.catfijo_suscripciones,
    es.catfijo_salud,
    es.catfijo_transporte,
    es.catfijo_otros
  ],
  fijos: [
    { concepto: es.fijo_alquiler, categoria: es.catfijo_vivienda, diaCargo: 1 },
    { concepto: es.fijo_internet, categoria: es.catfijo_suministros, diaCargo: 5 },
    { concepto: es.fijo_luz, categoria: es.catfijo_suministros, diaCargo: 10 },
    { concepto: es.fijo_agua, categoria: es.catfijo_suministros, diaCargo: 15 },
    { concepto: es.fijo_gimnasio, categoria: es.catfijo_salud, diaCargo: 1 }
  ]
};

// ---------------------------------------------------------------- semanas ----
comprobar('dia 1 -> S1', indiceSemana('2026-07-01'), 0);
comprobar('dia 7 -> S1', indiceSemana('2026-07-07'), 0);
comprobar('dia 8 -> S2', indiceSemana('2026-07-08'), 1);
comprobar('dia 21 -> S3', indiceSemana('2026-07-21'), 2);
comprobar('dia 28 -> S4', indiceSemana('2026-07-28'), 3);
comprobar('dia 29 -> S5', indiceSemana('2026-07-29'), 4);
comprobar('dia 31 -> S5', indiceSemana('2026-07-31'), 4);
comprobar('fecha mala', indiceSemana('lunes'), -1);

// -------------------------------------------- los numeros de la hoja Excel ---
const libro: LibroAnual = libroNuevo(2026, NOMBRES_ES, 'es');
const fijos = [750, 39.9, 55, 22, 34.95];
libro.gastosFijos.forEach((f, i) => (f.importe = fijos[i]));
// El Excel llevaba también Netflix, que el libro nuevo no trae de serie.
libro.gastosFijos.push({
  id: nuevoId(),
  concepto: 'Netflix',
  categoria: es.catfijo_suscripciones,
  importe: 12.99,
  diaCargo: 20,
  activo: true
});
const julio = libro.meses[6];
julio.gastos.push(
  { id: nuevoId(), fecha: '2026-07-03', categoria: 'Gasolina', concepto: 'Repsol', importe: 62.4 },
  {
    id: nuevoId(),
    fecha: '2026-07-05',
    categoria: 'Comida',
    concepto: 'Mercadona',
    importe: 78.15
  },
  { id: nuevoId(), fecha: '2026-07-11', categoria: 'Ocio', concepto: 'Cine', importe: 24 },
  { id: nuevoId(), fecha: '2026-07-18', categoria: 'Extras', concepto: 'Zapatillas', importe: 55.9 }
);
julio.ingresos.push(
  { id: nuevoId(), fecha: '2026-07-25', origen: 'Nómina', concepto: 'Julio', importe: 1850 },
  { id: nuevoId(), fecha: '2026-07-08', origen: 'Wallapop', concepto: 'Monitor', importe: 60 },
  { id: nuevoId(), fecha: '2026-07-12', origen: 'BlaBlaCar', concepto: 'Viaje', importe: 25 },
  { id: nuevoId(), fecha: '2026-07-14', origen: 'Bizum', concepto: 'Cena', importe: 18.5 }
);

const r = calcularResumenMes(libro, 7);
comprobar('semanas gasolina', r.rejilla[0].semanas, [62.4, 0, 0, 0, 0]);
comprobar('semanas ocio', r.rejilla[2].semanas, [0, 24, 0, 0, 0]);
comprobar('totales semana', r.totalesSemana, [140.55, 24, 55.9, 0, 0]);
comprobar('total diarios (Excel: 220,45)', r.totalDiarios, 220.45);
comprobar('total fijos (Excel: 914,84)', r.totalFijos, 914.84);
comprobar('total ingresos (Excel: 1953,50)', r.totalIngresos, 1953.5);
comprobar('total gastos (Excel: 1135,29)', r.totalGastos, 1135.29);
comprobar('ahorro (Excel: 818,21)', r.ahorro, 818.21);
comprobar('tasa ahorro (Excel: 41,9%)', Math.round((r.tasaAhorro ?? 0) * 1000) / 10, 41.9);
comprobar('fijos agrupados', r.fijos, [
  { etiqueta: 'Vivienda', huerfana: false, importe: 750 },
  { etiqueta: 'Suministros', huerfana: false, importe: 116.9 },
  { etiqueta: 'Salud y deporte', huerfana: false, importe: 34.95 },
  { etiqueta: 'Suscripciones', huerfana: false, importe: 12.99 }
]);

const vacio = calcularResumenMes(libro, 3);
comprobar(
  'marzo sin datos',
  [vacio.tieneDatos, vacio.totalDiarios, vacio.totalIngresos],
  [false, 0, 0]
);
comprobar('marzo si arrastra fijos en la vista mensual', vacio.totalFijos, 914.84);

const anual = calcularResumenAnual(libro);
comprobar('meses con datos', anual.mesesConDatos, 1);
comprobar('anual fijos = solo julio', anual.totalFijos, 914.84);
comprobar('anual ahorro = julio', anual.totalAhorro, 818.21);
comprobar('enero en blanco', anual.filas[0].ahorro, 0);
comprobar('el resumen anual no trae nombres de mes', 'nombre' in anual.filas[0], false);

// ------------------------------------------------- ida y vuelta al fichero ---
const texto = serializarLibro(libro, 'es');
const vuelta = libroDesdeTexto(texto, NOMBRES_ES);
comprobar('el fichero se relee sin errores', [vuelta.error, vuelta.avisos.length], [null, 0]);
const r2 = vuelta.libro ? calcularResumenMes(vuelta.libro, 7) : null;
comprobar('mismo ahorro despues de ida y vuelta', r2 ? r2.ahorro : null, 818.21);
comprobar('nombre del fichero', nombreFicheroLibro(libro), 'finanzas-2026.json');
comprobar('el fichero guarda el idioma', vuelta.libro ? vuelta.libro.idioma : null, 'es');
comprobar(
  'el fichero guarda las categorias de gastos fijos',
  vuelta.libro ? vuelta.libro.categoriasFijos.length : null,
  6
);

// -------------------------------------------------------- ficheros malos -----
function claveError(json: string): string | null {
  const res = libroDesdeTexto(json, NOMBRES_ES);
  return res.error ? res.error.clave : null;
}
comprobar('json roto', claveError('{malo'), 'json_invalido');
comprobar('no es un objeto', claveError('[1,2]'), 'json_no_objeto');
comprobar('otro formato', claveError('{"formato":"otra-cosa"}'), 'json_no_es_libro');
comprobar('sin version', claveError('{"formato":"finanzas-caseras"}'), 'json_sin_version');
comprobar('sin anio', claveError('{"formato":"finanzas-caseras","version":1}'), 'json_sin_anio');
comprobar(
  'version futura',
  claveError('{"formato":"finanzas-caseras","version":9,"anio":2026}'),
  'json_version_futura'
);

// ----------------------------------------------------- ficheros chapuceros ---
const chapucero = JSON.stringify({
  formato: 'finanzas-caseras',
  version: 1,
  anio: 2026,
  meses: [
    {
      mes: 5,
      gastos: [
        { fecha: '2026-05-04', categoria: 'Comida', importe: '12,50' },
        { fecha: 'ayer', importe: 3 }
      ]
    }
  ]
});
const leido = libroDesdeTexto(chapucero, NOMBRES_ES);
comprobar(
  'recupera importe "12,50"',
  leido.libro ? leido.libro.meses[4].gastos[0].importe : null,
  12.5
);
comprobar(
  'descarta la linea sin fecha valida',
  leido.libro ? leido.libro.meses[4].gastos.length : null,
  1
);
comprobar(
  'avisa de lo descartado',
  leido.avisos.map((a) => a.clave),
  ['json_sin_categorias', 'json_sin_origenes', 'json_descartada_1']
);
comprobar('rellena categorias por defecto', leido.libro ? leido.libro.categorias : null, [
  'Gasolina',
  'Comida',
  'Ocio',
  'Extras'
]);
comprobar('crea los 12 meses', leido.libro ? leido.libro.meses.length : null, 12);
comprobar(
  'fecha de otro mes se descarta',
  libroDesdeTexto(
    JSON.stringify({
      formato: 'finanzas-caseras',
      version: 1,
      anio: 2026,
      meses: [{ mes: 5, gastos: [{ fecha: '2026-06-04', importe: 5 }] }]
    }),
    NOMBRES_ES
  ).libro?.meses[4].gastos.length,
  0
);

// un apunte sin categoría no se pierde: va a la fila huérfana
const sinCategoria = libroDesdeTexto(
  JSON.stringify({
    formato: 'finanzas-caseras',
    version: 1,
    anio: 2026,
    categorias: ['Comida'],
    origenes: ['Nómina'],
    meses: [{ mes: 5, gastos: [{ fecha: '2026-05-04', importe: 10 }] }]
  }),
  NOMBRES_ES
);
const resumenSinCategoria = sinCategoria.libro ? calcularResumenMes(sinCategoria.libro, 5) : null;
comprobar(
  'el apunte sin categoria va a una fila huerfana',
  resumenSinCategoria
    ? resumenSinCategoria.rejilla.map((f) => [f.categoria, f.huerfana, f.total])
    : null,
  [
    ['Comida', false, 0],
    ['', true, 10]
  ]
);

// las categorías de gastos fijos se reconstruyen si el fichero no las traía
const fijosViejos = libroDesdeTexto(
  JSON.stringify({
    formato: 'finanzas-caseras',
    version: 1,
    anio: 2026,
    gastosFijos: [{ concepto: 'Miete', categoria: 'Wohnen', importe: 700 }]
  }),
  NOMBRES_ES
);
comprobar(
  'reconstruye las categorias de fijos desde los datos',
  fijosViejos.libro ? fijosViejos.libro.categoriasFijos : null,
  ['Wohnen']
);

// ------------------------------------------------- gasto por categoria -------
const porCatMes = calcularGastoPorCategoria(libro, 'mes', 7);
comprobar(
  'reparto del mes, de mas a menos',
  porCatMes.filas.map((f) => [f.fijos ? '(fijos)' : f.categoria, f.importe]),
  [
    ['Comida', 78.15],
    ['Gasolina', 62.4],
    ['Extras', 55.9],
    ['Ocio', 24],
    ['(fijos)', 914.84]
  ]
);
comprobar('el total del reparto coincide con el gasto del mes', porCatMes.total, 1135.29);
comprobar('los diarios del reparto', porCatMes.totalDiarios, 220.45);
comprobar(
  'los porcentajes suman 1',
  Math.round(porCatMes.filas.reduce((s, f) => s + f.porcentaje, 0) * 1000) / 1000,
  1
);
comprobar(
  'porcentaje de Comida sobre el total',
  Math.round(porCatMes.filas[0].porcentaje * 1000) / 10,
  6.9
);
comprobar('la barra mas alta es la de los fijos', porCatMes.maximo, 914.84);
comprobar('en la vista mensual los fijos cuentan una vez', porCatMes.mesesContados, 1);

const porCatAnio = calcularGastoPorCategoria(libro, 'anio', 7);
comprobar('solo julio tiene apuntes', porCatAnio.mesesContados, 1);
comprobar('el reparto anual coincide con el mensual', porCatAnio.total, 1135.29);

// un mes sin apuntes solo arrastra los fijos
const porCatMarzo = calcularGastoPorCategoria(libro, 'mes', 3);
comprobar(
  'marzo: solo la fila de fijos tiene importe',
  porCatMarzo.filas.filter((f) => f.importe > 0).map((f) => [f.fijos, f.importe]),
  [[true, 914.84]]
);
comprobar('marzo: el 100 % es de los fijos', porCatMarzo.filas.slice(-1)[0].porcentaje, 1);

// dos meses con apuntes: los fijos se cuentan dos veces en la vista anual
const libroDosMeses: LibroAnual = libroNuevo(2026, NOMBRES_ES, 'es');
libroDosMeses.gastosFijos.forEach((f) => (f.importe = 100));
libroDosMeses.meses[0].gastos.push({
  id: nuevoId(),
  fecha: '2026-01-10',
  categoria: 'Comida',
  concepto: '',
  importe: 40
});
libroDosMeses.meses[1].gastos.push({
  id: nuevoId(),
  fecha: '2026-02-10',
  categoria: 'Ocio',
  concepto: '',
  importe: 60
});
const dos = calcularGastoPorCategoria(libroDosMeses, 'anio', 1);
comprobar('dos meses con apuntes', dos.mesesContados, 2);
comprobar('fijos del ano = 5 x 100 x 2 meses', dos.totalFijos, 1000);
comprobar('total del ano', dos.total, 1100);
comprobar(
  'las categorias suman el ano entero',
  dos.filas.filter((f) => !f.fijos).map((f) => [f.categoria, f.importe]),
  [
    ['Ocio', 60],
    ['Comida', 40],
    ['Gasolina', 0],
    ['Extras', 0]
  ]
);

// un apunte sin categoria tiene su propia fila tambien aqui
const porCatHuerfano = sinCategoria.libro
  ? calcularGastoPorCategoria(sinCategoria.libro, 'mes', 5)
  : null;
comprobar(
  'el gasto sin categoria se reparte aparte',
  porCatHuerfano ? porCatHuerfano.filas.map((f) => [f.categoria, f.huerfana, f.importe]) : null,
  [
    ['', true, 10],
    ['Comida', false, 0]
  ]
);

// -------------------------------------------------------------- idiomas ------
comprobar('hay siete idiomas', IDIOMAS.length, 7);
comprobar(
  'codigos',
  IDIOMAS.map((i) => i.codigo),
  ['es', 'en', 'pt', 'it', 'fr', 'ru', 'de']
);

const claves = Object.keys(es) as ClaveTexto[];
console.log('     (' + claves.length + ' claves por idioma)');

for (const ficha of IDIOMAS) {
  const diccionario = DICCIONARIOS[ficha.codigo];
  const vacias = claves.filter((c) => !diccionario[c] || diccionario[c].trim() === '');
  comprobar('sin claves vacias en ' + ficha.codigo, vacias, []);
  const sobran = Object.keys(diccionario).filter((c) => !claves.includes(c as ClaveTexto));
  comprobar('sin claves de sobra en ' + ficha.codigo, sobran, []);
  // Los {parametros} tienen que sobrevivir a la traducción o el texto sale roto.
  const paramsMal = claves.filter((c) => {
    const origen = (es[c].match(/\{[a-z]+\}/g) ?? []).sort();
    const destino = (diccionario[c].match(/\{[a-z]+\}/g) ?? []).sort();
    return origen.join(',') !== destino.join(',');
  });
  comprobar('mismos parametros en ' + ficha.codigo, paramsMal, []);
  // Detecta olvidos: en otro idioma no debería quedar ningún texto largo
  // idéntico al español.
  if (ficha.codigo !== 'es') {
    const sinTraducir = claves.filter((c) => es[c].length > 25 && diccionario[c] === es[c]);
    comprobar('sin textos largos sin traducir en ' + ficha.codigo, sinTraducir, []);
  }
  // Intl tiene que conocer el locale y dar euros de verdad.
  const muestra = new Intl.NumberFormat(ficha.locale, {
    style: 'currency',
    currency: 'EUR'
  }).format(1234.5);
  comprobar('formato de euros en ' + ficha.codigo, muestra.includes('€'), true);
}

comprobar('detecta pt-BR como portugues', detectarIdioma(['pt-BR']), 'pt');
comprobar('detecta de-AT como aleman', detectarIdioma(['de-AT', 'en']), 'de');
comprobar('cae al espanol si no conoce ninguno', detectarIdioma(['ja', 'ko']), 'es');
comprobar('respeta el orden de preferencias', detectarIdioma(['zz', 'ru-RU', 'en']), 'ru');
comprobar(
  'esIdioma rechaza basura',
  [esIdioma('es'), esIdioma('zz'), esIdioma(7)],
  [true, false, false]
);

// ------------------------------------------ un libro nuevo en otro idioma ----
const nombresDe: NombresIniciales = {
  categorias: [DICCIONARIOS.de.cat_gasolina, DICCIONARIOS.de.cat_comida],
  origenes: [DICCIONARIOS.de.ori_nomina],
  categoriasFijos: [DICCIONARIOS.de.catfijo_vivienda],
  fijos: [
    {
      concepto: DICCIONARIOS.de.fijo_alquiler,
      categoria: DICCIONARIOS.de.catfijo_vivienda,
      diaCargo: 1
    }
  ]
};
const libroDe = libroNuevo(2027, nombresDe, 'de');
comprobar('libro nuevo en aleman: categorias', libroDe.categorias, ['Tanken', 'Essen']);
comprobar('libro nuevo en aleman: fijo', libroDe.gastosFijos[0].concepto, 'Miete');
comprobar('libro nuevo en aleman: importe a cero', libroDe.gastosFijos[0].importe, 0);
comprobar('libro nuevo en aleman: idioma', libroDe.idioma, 'de');

console.log(fallos === 0 ? '\nTODO CORRECTO' : '\n' + fallos + ' FALLOS');
process.exit(fallos === 0 ? 0 : 1);
