/** Resultados calculados. Nada de esto se guarda en el JSON: se recalcula siempre. */

export interface FilaSemanal {
  categoria: string;
  /** true en la fila que recoge los apuntes sin categoría. */
  huerfana: boolean;
  /** Cinco posiciones: semana 1 a semana 5. */
  semanas: number[];
  total: number;
}

export interface FilaImporte {
  etiqueta: string;
  /** true en la fila que recoge los ingresos sin origen. */
  huerfana: boolean;
  importe: number;
}

export interface ResumenMes {
  mes: number;
  rejilla: FilaSemanal[];
  /** Totales por semana, cinco posiciones. */
  totalesSemana: number[];
  totalDiarios: number;
  fijos: FilaImporte[];
  totalFijos: number;
  ingresos: FilaImporte[];
  totalIngresos: number;
  totalGastos: number;
  ahorro: number;
  /** null cuando no hay ingresos y no se puede dividir. */
  tasaAhorro: number | null;
  numApuntes: number;
  tieneDatos: boolean;
}

export interface FilaAnual {
  /** 1 a 12. El nombre lo pone la interfaz, que sabe en qué idioma está. */
  mes: number;
  diarios: number;
  fijos: number;
  ingresos: number;
  ahorro: number;
  tieneDatos: boolean;
}

export interface ResumenAnual {
  filas: FilaAnual[];
  totalDiarios: number;
  totalFijos: number;
  totalIngresos: number;
  totalAhorro: number;
  mesesConDatos: number;
}

/** Periodo que se está mirando en el reparto por categoría. */
export type Ambito = 'mes' | 'anio';

export interface FilaCategoria {
  /** Vacío en la fila de huérfanos y en la de gastos fijos: la etiqueta la pone la interfaz. */
  categoria: string;
  huerfana: boolean;
  /** true en la fila que agrupa todos los gastos fijos. */
  fijos: boolean;
  importe: number;
  /** Fracción sobre el total gastado en el periodo, de 0 a 1. */
  porcentaje: number;
}

export interface GastoPorCategoria {
  filas: FilaCategoria[];
  /** Importe de la fila más alta, para escalar las barras. */
  maximo: number;
  totalDiarios: number;
  totalFijos: number;
  total: number;
  /** Cuántos meses de gastos fijos se han contado. */
  mesesContados: number;
}
