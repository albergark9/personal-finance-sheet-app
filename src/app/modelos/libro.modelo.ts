/**
 * Estructura del fichero JSON que el usuario sube, edita y descarga.
 * Un fichero = un año.
 *
 * Los nombres de categorías, orígenes y gastos fijos son datos del usuario, no
 * literales de la interfaz: viven dentro del fichero. Un libro nuevo se crea
 * con los nombres en el idioma que esté activo en ese momento, y a partir de
 * ahí son suyos y no se traducen solos.
 */

import { Idioma } from '../i18n/idiomas';

export const FORMATO_LIBRO = 'finanzas-caseras';
export const VERSION_LIBRO = 1;

/** Un gasto del día. */
export interface Apunte {
  id: string;
  /** Fecha en formato YYYY-MM-DD. */
  fecha: string;
  /** Vacío si el apunte venía sin categoría: la interfaz lo muestra como "Sin categoría". */
  categoria: string;
  concepto: string;
  importe: number;
}

/** Una entrada de dinero. */
export interface Ingreso {
  id: string;
  fecha: string;
  origen: string;
  concepto: string;
  importe: number;
}

/** Un gasto que se repite todos los meses. */
export interface GastoFijo {
  id: string;
  concepto: string;
  categoria: string;
  importe: number;
  diaCargo: number | null;
  activo: boolean;
}

export interface DatosMes {
  /** 1 = enero … 12 = diciembre. */
  mes: number;
  gastos: Apunte[];
  ingresos: Ingreso[];
}

export interface LibroAnual {
  formato: typeof FORMATO_LIBRO;
  version: number;
  anio: number;
  categorias: string[];
  origenes: string[];
  categoriasFijos: string[];
  gastosFijos: GastoFijo[];
  meses: DatosMes[];
  /** Idioma con el que se usó por última vez, para reabrirlo igual. */
  idioma?: Idioma;
  /** Fecha ISO de la última descarga, solo informativa. */
  actualizado?: string;
}

/** Nombres con los que se rellena un libro nuevo, ya en el idioma activo. */
export interface NombresIniciales {
  categorias: string[];
  origenes: string[];
  categoriasFijos: string[];
  fijos: Array<{ concepto: string; categoria: string; diaCargo: number }>;
}

export function nuevoId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function mesesVacios(): DatosMes[] {
  const meses: DatosMes[] = [];
  for (let m = 1; m <= 12; m++) {
    meses.push({ mes: m, gastos: [], ingresos: [] });
  }
  return meses;
}

export function libroNuevo(anio: number, nombres: NombresIniciales, idioma: Idioma): LibroAnual {
  return {
    formato: FORMATO_LIBRO,
    version: VERSION_LIBRO,
    anio,
    categorias: [...nombres.categorias],
    origenes: [...nombres.origenes],
    categoriasFijos: [...nombres.categoriasFijos],
    // Los gastos fijos típicos, a 0 € para que solo haya que poner el importe.
    gastosFijos: nombres.fijos.map((f) => ({
      id: nuevoId(),
      concepto: f.concepto,
      categoria: f.categoria,
      importe: 0,
      diaCargo: f.diaCargo,
      activo: true
    })),
    meses: mesesVacios(),
    idioma
  };
}
