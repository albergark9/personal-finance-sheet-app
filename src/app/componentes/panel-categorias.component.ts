import { Component, Input, OnChanges } from '@angular/core';

import { LibroAnual } from '../modelos/libro.modelo';
import { Ambito, FilaCategoria, GastoPorCategoria } from '../modelos/resumen.modelo';
import { calcularGastoPorCategoria } from '../servicios/calculos';

/**
 * Dónde se va el dinero: cada categoría con su suma, su porcentaje sobre el
 * total gastado y una barra para compararlas de un vistazo. Se puede mirar el
 * mes que está abierto o el año entero.
 */
@Component({
  selector: 'fc-panel-categorias',
  templateUrl: './panel-categorias.component.html'
})
export class PanelCategoriasComponent implements OnChanges {
  @Input() libro: LibroAnual | null = null;
  @Input() mes = 1;

  ambito: Ambito = 'mes';
  reparto: GastoPorCategoria | null = null;

  ngOnChanges(): void {
    this.recalcular();
  }

  cambiarAmbito(ambito: Ambito): void {
    this.ambito = ambito;
    this.recalcular();
  }

  /** Ancho de la barra: proporcional a la fila más alta, no al total. */
  ancho(fila: FilaCategoria): number {
    const maximo = this.reparto ? this.reparto.maximo : 0;
    if (maximo <= 0 || fila.importe <= 0) {
      return 0;
    }
    return Math.max(2, Math.round((fila.importe / maximo) * 100));
  }

  clave(_indice: number, fila: FilaCategoria): string {
    return fila.fijos ? '__fijos__' : fila.huerfana ? '__huerfanos__' : fila.categoria;
  }

  private recalcular(): void {
    this.reparto = this.libro
      ? calcularGastoPorCategoria(this.libro, this.ambito, this.mes)
      : null;
  }
}
