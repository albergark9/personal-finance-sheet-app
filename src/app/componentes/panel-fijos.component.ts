import { Component, Input } from '@angular/core';

import { GastoFijo, LibroAnual } from '../modelos/libro.modelo';
import { totalFijosActivos } from '../servicios/calculos';
import { LibroService } from '../servicios/libro.service';
import { TraduccionService } from '../servicios/traduccion.service';

/**
 * Los gastos fijos se definen una vez para todo el año y cuentan en cada mes.
 * Se editan en la propia tabla, sin formulario aparte, porque casi siempre lo
 * único que cambia es el importe.
 */
@Component({
  selector: 'fc-panel-fijos',
  templateUrl: './panel-fijos.component.html'
})
export class PanelFijosComponent {
  @Input() libro: LibroAnual | null = null;

  constructor(
    private readonly libros: LibroService,
    private readonly idiomas: TraduccionService
  ) {}

  get fijos(): GastoFijo[] {
    return this.libro ? this.libro.gastosFijos : [];
  }

  /**
   * Las categorías salen del propio fichero. Si es un fichero antiguo que no
   * las traía, se usan las del idioma activo para no dejar el desplegable vacío.
   */
  get categorias(): string[] {
    const delLibro = this.libro ? this.libro.categoriasFijos : [];
    return delLibro.length > 0 ? delLibro : this.idiomas.nombresIniciales().categoriasFijos;
  }

  get total(): number {
    return this.libro ? totalFijosActivos(this.libro) : 0;
  }

  get activos(): number {
    return this.fijos.filter((f) => f.activo).length;
  }

  anadir(): void {
    const categorias = this.categorias;
    this.libros.anadirFijo(categorias[categorias.length - 1] ?? '');
  }

  cambiarConcepto(fijo: GastoFijo, valor: string): void {
    this.libros.actualizarFijo(fijo.id, { concepto: valor });
  }

  cambiarCategoria(fijo: GastoFijo, valor: string): void {
    this.libros.actualizarFijo(fijo.id, { categoria: valor });
  }

  cambiarImporte(fijo: GastoFijo, valor: number | null): void {
    // Mientras se escribe "12," el navegador manda null: se ignora para no
    // sobrescribir el campo a medio teclear.
    if (valor === null || !Number.isFinite(valor) || valor < 0) {
      return;
    }
    this.libros.actualizarFijo(fijo.id, { importe: valor });
  }

  cambiarDia(fijo: GastoFijo, valor: number | null): void {
    const dia = valor === null ? null : Math.trunc(valor);
    this.libros.actualizarFijo(fijo.id, {
      diaCargo: dia !== null && dia >= 1 && dia <= 31 ? dia : null
    });
  }

  alternar(fijo: GastoFijo): void {
    this.libros.actualizarFijo(fijo.id, { activo: !fijo.activo });
  }

  /** Nombre con el que referirse a una línea en los mensajes y en el aria-label. */
  nombre(fijo: GastoFijo): string {
    return fijo.concepto === '' ? this.idiomas.t('fijos_este') : fijo.concepto;
  }

  borrar(fijo: GastoFijo): void {
    const pregunta = this.idiomas.t('fijos_confirmar_quitar', { que: this.nombre(fijo) });
    if (window.confirm(pregunta)) {
      this.libros.borrarFijo(fijo.id);
    }
  }

  clave(_indice: number, fijo: GastoFijo): string {
    return fijo.id;
  }
}
