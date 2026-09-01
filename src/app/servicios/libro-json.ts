/**
 * Lectura, validación y escritura del fichero JSON.
 *
 * Aquí no se importa nada de Angular a propósito: son funciones puras sobre
 * datos, así que se pueden ejecutar con `node` a pelo (ver pruebas/prueba.ts).
 * Lo que necesita navegador — FileReader y la descarga — está en
 * archivo.service.ts.
 */

import { ClaveTexto } from '../i18n/es';
import { Idioma, esIdioma } from '../i18n/idiomas';
import {
  Apunte,
  DatosMes,
  FORMATO_LIBRO,
  GastoFijo,
  Ingreso,
  LibroAnual,
  NombresIniciales,
  VERSION_LIBRO,
  mesesVacios,
  nuevoId
} from '../modelos/libro.modelo';

/**
 * Un mensaje sin traducir: la clave y sus parámetros. Este módulo no sabe en
 * qué idioma está la interfaz, así que devuelve claves y quien las muestra las
 * traduce.
 */
export interface Incidencia {
  clave: ClaveTexto;
  params?: Record<string, string | number>;
}

export interface ResultadoLectura {
  libro: LibroAnual | null;
  /** Motivo por el que el fichero no se puede abrir. */
  error: Incidencia | null;
  /** Cosas que se han corregido al abrir y que conviene contar al usuario. */
  avisos: Incidencia[];
}

type Desconocido = Record<string, unknown>;

export function libroDesdeTexto(texto: string, nombres: NombresIniciales): ResultadoLectura {
  let crudo: unknown;
  try {
    crudo = JSON.parse(texto);
  } catch {
    return { libro: null, error: { clave: 'json_invalido' }, avisos: [] };
  }
  return validarLibro(crudo, nombres);
}

/**
 * Comprueba el fichero y lo normaliza. Es permisivo con lo que puede arreglar
 * (importes en texto, meses que faltan, ids repetidos) y tajante con lo que no
 * (que no sea un libro de esta aplicación o que no tenga año).
 */
export function validarLibro(crudo: unknown, nombres: NombresIniciales): ResultadoLectura {
  const avisos: Incidencia[] = [];

  if (crudo === null || typeof crudo !== 'object' || Array.isArray(crudo)) {
    return { libro: null, error: { clave: 'json_no_objeto' }, avisos };
  }

  const raiz = crudo as Desconocido;

  if (raiz['formato'] !== FORMATO_LIBRO) {
    return {
      libro: null,
      error: { clave: 'json_no_es_libro', params: { formato: FORMATO_LIBRO } },
      avisos
    };
  }

  const version = aNumero(raiz['version']);
  if (version === null) {
    return { libro: null, error: { clave: 'json_sin_version' }, avisos };
  }
  if (version > VERSION_LIBRO) {
    return {
      libro: null,
      error: {
        clave: 'json_version_futura',
        params: { version, actual: VERSION_LIBRO }
      },
      avisos
    };
  }

  const anio = aNumero(raiz['anio']);
  if (anio === null || anio < 1900 || anio > 2200) {
    return { libro: null, error: { clave: 'json_sin_anio' }, avisos };
  }

  const categorias = aListaTextos(raiz['categorias']);
  if (categorias.length === 0) {
    categorias.push(...nombres.categorias);
    avisos.push({ clave: 'json_sin_categorias' });
  }

  const origenes = aListaTextos(raiz['origenes']);
  if (origenes.length === 0) {
    origenes.push(...nombres.origenes);
    avisos.push({ clave: 'json_sin_origenes' });
  }

  const idsVistos = new Set<string>();
  const idUnico = (valor: unknown): string => {
    const texto = typeof valor === 'string' ? valor.trim() : '';
    if (texto === '' || idsVistos.has(texto)) {
      const generado = nuevoId();
      idsVistos.add(generado);
      return generado;
    }
    idsVistos.add(texto);
    return texto;
  };

  const gastosFijos: GastoFijo[] = [];
  for (const bruto of aLista(raiz['gastosFijos'])) {
    const fila = bruto as Desconocido;
    const importe = aNumero(fila['importe']);
    const concepto = aTexto(fila['concepto']);
    if (concepto === '' && importe === null) {
      continue;
    }
    gastosFijos.push({
      id: idUnico(fila['id']),
      concepto: concepto === '' ? 'Sin nombre' : concepto,
      categoria: aTexto(fila['categoria']),
      importe: importe ?? 0,
      diaCargo: aDia(fila['diaCargo']),
      activo: fila['activo'] !== false
    });
  }

  const meses: DatosMes[] = mesesVacios();
  let descartados = 0;

  for (const bruto of aLista(raiz['meses'])) {
    const fila = bruto as Desconocido;
    const mes = aNumero(fila['mes']);
    if (mes === null || mes < 1 || mes > 12) {
      descartados++;
      continue;
    }
    const destino = meses[mes - 1];

    for (const brutoGasto of aLista(fila['gastos'])) {
      const g = brutoGasto as Desconocido;
      const importe = aNumero(g['importe']);
      const fecha = aFecha(g['fecha'], anio, mes);
      if (importe === null || fecha === null) {
        descartados++;
        continue;
      }
      const apunte: Apunte = {
        id: idUnico(g['id']),
        fecha,
        categoria: aTexto(g['categoria']),
        concepto: aTexto(g['concepto']),
        importe
      };
      destino.gastos.push(apunte);
    }

    for (const brutoIngreso of aLista(fila['ingresos'])) {
      const i = brutoIngreso as Desconocido;
      const importe = aNumero(i['importe']);
      const fecha = aFecha(i['fecha'], anio, mes);
      if (importe === null || fecha === null) {
        descartados++;
        continue;
      }
      const ingreso: Ingreso = {
        id: idUnico(i['id']),
        fecha,
        origen: aTexto(i['origen']),
        concepto: aTexto(i['concepto']),
        importe
      };
      destino.ingresos.push(ingreso);
    }
  }

  if (descartados > 0) {
    avisos.push(
      descartados === 1
        ? { clave: 'json_descartada_1' }
        : { clave: 'json_descartadas_n', params: { n: descartados } }
    );
  }

  // La lista de categorías de gasto fijo puede no venir (ficheros de antes de
  // que existiera): se reconstruye con las que usan los propios gastos fijos,
  // así el desplegable nunca pierde un valor que está en los datos.
  const categoriasFijos = aListaTextos(raiz['categoriasFijos']);
  for (const fijo of gastosFijos) {
    if (fijo.categoria !== '' && !categoriasFijos.includes(fijo.categoria)) {
      categoriasFijos.push(fijo.categoria);
    }
  }

  const idiomaCrudo = raiz['idioma'];

  const libro: LibroAnual = {
    formato: FORMATO_LIBRO,
    version: VERSION_LIBRO,
    anio,
    categorias,
    origenes,
    categoriasFijos,
    gastosFijos,
    meses
  };
  if (esIdioma(idiomaCrudo)) {
    libro.idioma = idiomaCrudo;
  }

  return { libro, error: null, avisos };
}

export function serializarLibro(libro: LibroAnual, idioma: Idioma): string {
  const copia: LibroAnual = {
    ...libro,
    version: VERSION_LIBRO,
    idioma,
    actualizado: new Date().toISOString()
  };
  return JSON.stringify(copia, null, 2);
}

export function nombreFicheroLibro(libro: LibroAnual): string {
  return 'finanzas-' + libro.anio + '.json';
}

// ---- ayudas de conversión ----

function aLista(valor: unknown): unknown[] {
  return Array.isArray(valor) ? valor.filter((v) => v !== null && typeof v === 'object') : [];
}

function aListaTextos(valor: unknown): string[] {
  if (!Array.isArray(valor)) {
    return [];
  }
  const salida: string[] = [];
  for (const item of valor) {
    const texto = aTexto(item);
    if (texto !== '' && !salida.includes(texto)) {
      salida.push(texto);
    }
  }
  return salida;
}

function aTexto(valor: unknown): string {
  return typeof valor === 'string' ? valor.trim() : '';
}

function aNumero(valor: unknown): number | null {
  if (typeof valor === 'number' && Number.isFinite(valor)) {
    return valor;
  }
  if (typeof valor === 'string') {
    // Acepta "12,50" además de "12.50".
    const limpio = valor.trim().replace(/\s/g, '').replace(',', '.');
    if (limpio === '') {
      return null;
    }
    const numero = Number(limpio);
    return Number.isFinite(numero) ? numero : null;
  }
  return null;
}

function aDia(valor: unknown): number | null {
  const numero = aNumero(valor);
  if (numero === null) {
    return null;
  }
  const entero = Math.trunc(numero);
  return entero >= 1 && entero <= 31 ? entero : null;
}

/** Solo acepta YYYY-MM-DD y comprueba que caiga en el año y mes del bloque. */
function aFecha(valor: unknown, anio: number, mes: number): string | null {
  const texto = aTexto(valor);
  const trozos = /^(\d{4})-(\d{2})-(\d{2})$/.exec(texto);
  if (!trozos) {
    return null;
  }
  const a = Number(trozos[1]);
  const m = Number(trozos[2]);
  const d = Number(trozos[3]);
  if (a !== anio || m !== mes || d < 1 || d > 31) {
    return null;
  }
  return texto;
}
