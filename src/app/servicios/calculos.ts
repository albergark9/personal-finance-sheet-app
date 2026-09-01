import { DatosMes, LibroAnual } from '../modelos/libro.modelo';
import {
  Ambito,
  FilaAnual,
  FilaCategoria,
  FilaImporte,
  FilaSemanal,
  GastoPorCategoria,
  ResumenAnual,
  ResumenMes
} from '../modelos/resumen.modelo';

export const ETIQUETAS_SEMANA = ['1 – 7', '8 – 14', '15 – 21', '22 – 28', '29 – 31'];

/**
 * Misma regla que la hoja de Excel: semana 1 = días 1-7, semana 2 = 8-14,
 * semana 3 = 15-21, semana 4 = 22-28, semana 5 = 29-31.
 * Devuelve un índice de 0 a 4, o -1 si la fecha no es válida.
 */
export function indiceSemana(fechaISO: string): number {
  const dia = diaDelMes(fechaISO);
  if (dia === null) {
    return -1;
  }
  return Math.min(4, Math.ceil(dia / 7) - 1);
}

export function diaDelMes(fechaISO: string): number | null {
  const trozos = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fechaISO);
  if (!trozos) {
    return null;
  }
  const dia = Number(trozos[3]);
  return dia >= 1 && dia <= 31 ? dia : null;
}

export function mesDeFecha(fechaISO: string): number | null {
  const trozos = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fechaISO);
  if (!trozos) {
    return null;
  }
  const mes = Number(trozos[2]);
  return mes >= 1 && mes <= 12 ? mes : null;
}

/** Redondea a dos decimales para que no se acumule basura de coma flotante. */
export function redondear(valor: number): number {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

export function datosDeMes(libro: LibroAnual, mes: number): DatosMes {
  const encontrado = libro.meses.find((m) => m.mes === mes);
  return encontrado ?? { mes, gastos: [], ingresos: [] };
}

export function totalFijosActivos(libro: LibroAnual): number {
  return redondear(
    libro.gastosFijos
      .filter((f) => f.activo)
      .reduce((suma, f) => suma + (Number.isFinite(f.importe) ? f.importe : 0), 0)
  );
}

export function calcularResumenMes(libro: LibroAnual, mes: number): ResumenMes {
  const datos = datosDeMes(libro, mes);

  const rejilla: FilaSemanal[] = libro.categorias.map((categoria) => ({
    categoria,
    huerfana: false,
    semanas: [0, 0, 0, 0, 0],
    total: 0
  }));
  // Los apuntes sin categoría, o con una que ya no está en el libro, no se
  // pierden: van a esta fila, que la interfaz etiqueta en su idioma.
  const huerfanos: FilaSemanal = {
    categoria: '',
    huerfana: true,
    semanas: [0, 0, 0, 0, 0],
    total: 0
  };

  for (const gasto of datos.gastos) {
    const i = indiceSemana(gasto.fecha);
    if (i < 0) {
      continue;
    }
    const fila = rejilla.find((f) => f.categoria === gasto.categoria) ?? huerfanos;
    fila.semanas[i] = redondear(fila.semanas[i] + gasto.importe);
    fila.total = redondear(fila.total + gasto.importe);
  }
  if (huerfanos.total > 0) {
    rejilla.push(huerfanos);
  }

  const totalesSemana = [0, 1, 2, 3, 4].map((i) =>
    redondear(rejilla.reduce((suma, fila) => suma + fila.semanas[i], 0))
  );
  const totalDiarios = redondear(rejilla.reduce((suma, fila) => suma + fila.total, 0));

  const fijos: FilaImporte[] = [];
  for (const fijo of libro.gastosFijos) {
    if (!fijo.activo) {
      continue;
    }
    const existente = fijos.find((f) => f.etiqueta === fijo.categoria);
    if (existente) {
      existente.importe = redondear(existente.importe + fijo.importe);
    } else {
      fijos.push({ etiqueta: fijo.categoria, huerfana: false, importe: redondear(fijo.importe) });
    }
  }
  const totalFijos = redondear(fijos.reduce((suma, f) => suma + f.importe, 0));

  const ingresos: FilaImporte[] = libro.origenes.map((origen) => ({
    etiqueta: origen,
    huerfana: false,
    importe: 0
  }));
  const otrosIngresos: FilaImporte = { etiqueta: '', huerfana: true, importe: 0 };
  for (const entrada of datos.ingresos) {
    const fila = ingresos.find((f) => f.etiqueta === entrada.origen) ?? otrosIngresos;
    fila.importe = redondear(fila.importe + entrada.importe);
  }
  if (otrosIngresos.importe > 0) {
    ingresos.push(otrosIngresos);
  }
  const totalIngresos = redondear(ingresos.reduce((suma, f) => suma + f.importe, 0));

  const totalGastos = redondear(totalDiarios + totalFijos);
  const ahorro = redondear(totalIngresos - totalGastos);
  const numApuntes = datos.gastos.length + datos.ingresos.length;

  return {
    mes,
    rejilla,
    totalesSemana,
    totalDiarios,
    fijos,
    totalFijos,
    ingresos,
    totalIngresos,
    totalGastos,
    ahorro,
    tasaAhorro: totalIngresos > 0 ? ahorro / totalIngresos : null,
    numApuntes,
    tieneDatos: numApuntes > 0
  };
}

/**
 * Vista del año entero. Los meses sin ningún apunte se marcan como vacíos y no
 * arrastran los gastos fijos: si no has usado un mes, no tiene sentido decir que
 * has perdido el alquiler.
 */
export function calcularResumenAnual(libro: LibroAnual): ResumenAnual {
  const fijosMes = totalFijosActivos(libro);
  const filas: FilaAnual[] = [];

  for (let mes = 1; mes <= 12; mes++) {
    const datos = datosDeMes(libro, mes);
    const tieneDatos = datos.gastos.length + datos.ingresos.length > 0;
    const diarios = redondear(datos.gastos.reduce((suma, g) => suma + g.importe, 0));
    const ingresos = redondear(datos.ingresos.reduce((suma, i) => suma + i.importe, 0));
    const fijos = tieneDatos ? fijosMes : 0;
    filas.push({
      mes,
      diarios,
      fijos,
      ingresos,
      ahorro: redondear(ingresos - diarios - fijos),
      tieneDatos
    });
  }

  return {
    filas,
    totalDiarios: redondear(filas.reduce((s, f) => s + f.diarios, 0)),
    totalFijos: redondear(filas.reduce((s, f) => s + f.fijos, 0)),
    totalIngresos: redondear(filas.reduce((s, f) => s + f.ingresos, 0)),
    totalAhorro: redondear(filas.reduce((s, f) => s + f.ahorro, 0)),
    mesesConDatos: filas.filter((f) => f.tieneDatos).length
  };
}

/**
 * Reparto del gasto por categoría, para el mes que se está mirando o para el
 * año entero. Los gastos fijos entran como una fila más, para que los
 * porcentajes sean sobre todo lo que se ha gastado y no solo sobre el día a
 * día: si el alquiler se lleva la mitad, se ve.
 *
 * En el ámbito anual los fijos cuentan una vez por cada mes que tenga algún
 * apunte, con la misma regla que la tabla del año.
 */
export function calcularGastoPorCategoria(
  libro: LibroAnual,
  ambito: Ambito,
  mes: number
): GastoPorCategoria {
  const meses = ambito === 'mes' ? [datosDeMes(libro, mes)] : libro.meses;

  const porCategoria = new Map<string, number>();
  for (const categoria of libro.categorias) {
    porCategoria.set(categoria, 0);
  }
  let huerfanos = 0;

  for (const datos of meses) {
    for (const gasto of datos.gastos) {
      if (porCategoria.has(gasto.categoria)) {
        porCategoria.set(gasto.categoria, redondear(porCategoria.get(gasto.categoria)! + gasto.importe));
      } else if (gasto.categoria === '') {
        huerfanos = redondear(huerfanos + gasto.importe);
      } else {
        // Categoría que ya no está en la lista del libro: se conserva como fila propia.
        porCategoria.set(gasto.categoria, redondear((porCategoria.get(gasto.categoria) ?? 0) + gasto.importe));
      }
    }
  }

  const fijosMes = totalFijosActivos(libro);
  // En la vista mensual los fijos cuentan una vez; en la anual, una por cada mes
  // que tenga algún apunte, igual que en la tabla del año.
  const mesesContados =
    ambito === 'mes'
      ? 1
      : libro.meses.filter((m) => m.gastos.length + m.ingresos.length > 0).length;
  const totalFijos = redondear(fijosMes * mesesContados);

  const filas: FilaCategoria[] = [];
  porCategoria.forEach((importe, categoria) => {
    filas.push({ categoria, huerfana: false, fijos: false, importe, porcentaje: 0 });
  });
  if (huerfanos > 0) {
    filas.push({ categoria: '', huerfana: true, fijos: false, importe: huerfanos, porcentaje: 0 });
  }
  // De más gastado a menos: la primera línea es la respuesta a "¿dónde se me va?".
  filas.sort((a, b) => b.importe - a.importe);

  const totalDiarios = redondear(filas.reduce((suma, f) => suma + f.importe, 0));
  const total = redondear(totalDiarios + totalFijos);

  if (totalFijos > 0) {
    filas.push({ categoria: '', huerfana: false, fijos: true, importe: totalFijos, porcentaje: 0 });
  }
  for (const fila of filas) {
    fila.porcentaje = total > 0 ? fila.importe / total : 0;
  }

  return {
    filas,
    maximo: filas.reduce((mayor, f) => Math.max(mayor, f.importe), 0),
    totalDiarios,
    totalFijos,
    total,
    mesesContados
  };
}
