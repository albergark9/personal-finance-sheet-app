import { Component, Input } from '@angular/core';

import { ResumenMes } from '../modelos/resumen.modelo';

@Component({
  selector: 'fc-panel-resumen',
  templateUrl: './panel-resumen.component.html'
})
export class PanelResumenComponent {
  @Input() resumen: ResumenMes | null = null;
  @Input() anio = 0;
  @Input() mes = 1;

  get ahorro(): number {
    return this.resumen ? this.resumen.ahorro : 0;
  }

  get positivo(): boolean {
    return this.ahorro >= 0;
  }

  /**
   * Ancho de la barra de tasa de ahorro, recortado al 100 % para que un mes
   * raro (una devolución gorda sin gastos) no la desborde.
   */
  get anchoTasa(): number {
    const tasa = this.resumen ? this.resumen.tasaAhorro : null;
    if (tasa === null) {
      return 0;
    }
    return Math.max(0, Math.min(100, Math.round(tasa * 100)));
  }
}
