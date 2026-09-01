import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Apunte,
  DatosMes,
  GastoFijo,
  Ingreso,
  LibroAnual,
  libroNuevo,
  nuevoId
} from '../modelos/libro.modelo';
import { Incidencia } from './libro-json';
import { TraduccionService } from './traduccion.service';
import { ResumenAnual, ResumenMes } from '../modelos/resumen.modelo';
import { calcularResumenAnual, calcularResumenMes, mesDeFecha, redondear } from './calculos';

export interface NuevoApunte {
  fecha: string;
  categoria: string;
  concepto: string;
  importe: number;
}

export interface NuevoIngreso {
  fecha: string;
  origen: string;
  concepto: string;
  importe: number;
}

/**
 * Todo el estado de la aplicación vive aquí, en memoria. No hay servidor ni
 * base de datos: el único sitio donde los datos duran es el fichero JSON que
 * el usuario descarga.
 */
@Injectable({ providedIn: 'root' })
export class LibroService {
  private readonly libroSujeto = new BehaviorSubject<LibroAnual | null>(null);
  private readonly mesSujeto = new BehaviorSubject<number>(new Date().getMonth() + 1);
  private readonly sucioSujeto = new BehaviorSubject<boolean>(false);

  readonly libro$: Observable<LibroAnual | null> = this.libroSujeto.asObservable();
  readonly mes$: Observable<number> = this.mesSujeto.asObservable();
  readonly sucio$: Observable<boolean> = this.sucioSujeto.asObservable();

  readonly resumenMes$: Observable<ResumenMes | null> = combineLatest([
    this.libro$,
    this.mes$
  ]).pipe(map(([libro, mes]) => (libro ? calcularResumenMes(libro, mes) : null)));

  readonly resumenAnual$: Observable<ResumenAnual | null> = this.libro$.pipe(
    map((libro) => (libro ? calcularResumenAnual(libro) : null))
  );

  constructor(private readonly idiomas: TraduccionService) {}

  get libro(): LibroAnual | null {
    return this.libroSujeto.value;
  }

  get mes(): number {
    return this.mesSujeto.value;
  }

  get sucio(): boolean {
    return this.sucioSujeto.value;
  }

  // ---- abrir y cerrar ----

  crear(anio: number): void {
    this.libroSujeto.next(
      libroNuevo(anio, this.idiomas.nombresIniciales(), this.idiomas.idioma)
    );
    this.mesSujeto.next(this.mesPorDefecto(anio));
    this.sucioSujeto.next(true);
  }

  abrir(libro: LibroAnual): void {
    // Si el fichero recuerda con qué idioma se usó, se vuelve a ese idioma.
    if (libro.idioma) {
      this.idiomas.cambiar(libro.idioma);
    }
    this.libroSujeto.next(libro);
    this.mesSujeto.next(this.mesPorDefecto(libro.anio));
    this.sucioSujeto.next(false);
  }

  cerrar(): void {
    this.libroSujeto.next(null);
    this.sucioSujeto.next(false);
  }

  marcarGuardado(): void {
    this.sucioSujeto.next(false);
  }

  seleccionarMes(mes: number): void {
    if (mes >= 1 && mes <= 12) {
      this.mesSujeto.next(mes);
    }
  }

  /** Si el libro es del año en curso abre el mes de hoy; si no, enero. */
  private mesPorDefecto(anio: number): number {
    const hoy = new Date();
    return anio === hoy.getFullYear() ? hoy.getMonth() + 1 : 1;
  }

  // ---- gastos del día ----

  /** Devuelve null si va bien, o el motivo del rechazo. */
  anadirGasto(datos: NuevoApunte): Incidencia | null {
    const validacion = this.validarLinea(datos.fecha, datos.importe);
    if (validacion) {
      return validacion;
    }
    const mes = mesDeFecha(datos.fecha);
    if (mes === null) {
      return { clave: 'error_fecha_invalida' };
    }
    const apunte: Apunte = {
      id: nuevoId(),
      fecha: datos.fecha,
      categoria: datos.categoria,
      concepto: datos.concepto.trim(),
      importe: redondear(datos.importe)
    };
    this.cambiarMes(mes, (m) => ({ ...m, gastos: this.ordenar([...m.gastos, apunte]) }));
    this.seleccionarMes(mes);
    return null;
  }

  borrarGasto(mes: number, id: string): void {
    this.cambiarMes(mes, (m) => ({ ...m, gastos: m.gastos.filter((g) => g.id !== id) }));
  }

  // ---- ingresos ----

  anadirIngreso(datos: NuevoIngreso): Incidencia | null {
    const validacion = this.validarLinea(datos.fecha, datos.importe);
    if (validacion) {
      return validacion;
    }
    const mes = mesDeFecha(datos.fecha);
    if (mes === null) {
      return { clave: 'error_fecha_invalida' };
    }
    const ingreso: Ingreso = {
      id: nuevoId(),
      fecha: datos.fecha,
      origen: datos.origen,
      concepto: datos.concepto.trim(),
      importe: redondear(datos.importe)
    };
    this.cambiarMes(mes, (m) => ({ ...m, ingresos: this.ordenar([...m.ingresos, ingreso]) }));
    this.seleccionarMes(mes);
    return null;
  }

  borrarIngreso(mes: number, id: string): void {
    this.cambiarMes(mes, (m) => ({ ...m, ingresos: m.ingresos.filter((i) => i.id !== id) }));
  }

  // ---- gastos fijos ----

  anadirFijo(categoria: string): string {
    const fijo: GastoFijo = {
      id: nuevoId(),
      concepto: '',
      categoria,
      importe: 0,
      diaCargo: null,
      activo: true
    };
    this.cambiarLibro((libro) => ({ ...libro, gastosFijos: [...libro.gastosFijos, fijo] }));
    return fijo.id;
  }

  actualizarFijo(id: string, cambios: Partial<Omit<GastoFijo, 'id'>>): void {
    this.cambiarLibro((libro) => ({
      ...libro,
      gastosFijos: libro.gastosFijos.map((f) =>
        f.id === id
          ? {
              ...f,
              ...cambios,
              importe:
                cambios.importe === undefined || !Number.isFinite(cambios.importe)
                  ? f.importe
                  : redondear(cambios.importe)
            }
          : f
      )
    }));
  }

  borrarFijo(id: string): void {
    this.cambiarLibro((libro) => ({
      ...libro,
      gastosFijos: libro.gastosFijos.filter((f) => f.id !== id)
    }));
  }

  // ---- listas ----

  anadirCategoria(nombre: string): Incidencia | null {
    const limpio = nombre.trim();
    if (limpio === '') {
      return { clave: 'error_nombre_categoria' };
    }
    const libro = this.libro;
    if (libro && libro.categorias.some((c) => c.toLowerCase() === limpio.toLowerCase())) {
      return { clave: 'error_categoria_existe' };
    }
    this.cambiarLibro((actual) => ({ ...actual, categorias: [...actual.categorias, limpio] }));
    return null;
  }

  anadirOrigen(nombre: string): Incidencia | null {
    const limpio = nombre.trim();
    if (limpio === '') {
      return { clave: 'error_nombre_origen' };
    }
    const libro = this.libro;
    if (libro && libro.origenes.some((o) => o.toLowerCase() === limpio.toLowerCase())) {
      return { clave: 'error_origen_existe' };
    }
    this.cambiarLibro((actual) => ({ ...actual, origenes: [...actual.origenes, limpio] }));
    return null;
  }

  // ---- interno ----

  private validarLinea(fecha: string, importe: number): Incidencia | null {
    const libro = this.libro;
    if (!libro) {
      return { clave: 'error_sin_libro' };
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      return { clave: 'error_fecha' };
    }
    if (Number(fecha.slice(0, 4)) !== libro.anio) {
      return {
        clave: 'error_otro_anio',
        params: { fecha: fecha.slice(0, 4), anio: libro.anio }
      };
    }
    if (!Number.isFinite(importe) || importe <= 0) {
      return { clave: 'error_importe' };
    }
    return null;
  }

  private ordenar<T extends { fecha: string }>(lista: T[]): T[] {
    return [...lista].sort((a, b) => a.fecha.localeCompare(b.fecha));
  }

  private cambiarMes(mes: number, cambio: (datos: DatosMes) => DatosMes): void {
    this.cambiarLibro((libro) => ({
      ...libro,
      meses: libro.meses.map((m) => (m.mes === mes ? cambio(m) : m))
    }));
  }

  private cambiarLibro(cambio: (libro: LibroAnual) => LibroAnual): void {
    const actual = this.libro;
    if (!actual) {
      return;
    }
    this.libroSujeto.next(cambio(actual));
    this.sucioSujeto.next(true);
  }
}
