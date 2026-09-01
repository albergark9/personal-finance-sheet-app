import { Component, Input } from '@angular/core';

import { FilaAnual, ResumenAnual } from '../modelos/resumen.modelo';
import { LibroService } from '../servicios/libro.service';
import { TraduccionService } from '../servicios/traduccion.service';

/**
 * Los doce meses del año en una tira. La barrita de cada mes es su gasto total
 * comparado con el mes que más ha gastado, para ver de un golpe donde se va el
 * dinero sin abrir nada.
 */
@Component({
  selector: 'fc-cinta-meses',
  templateUrl: './cinta-meses.component.html'
})
export class CintaMesesComponent {
  @Input() anual: ResumenAnual | null = null;
  @Input() mesActivo = 1;

  constructor(
    private readonly libros: LibroService,
    private readonly idiomas: TraduccionService
  ) {}

  get filas(): FilaAnual[] {
    return this.anual ? this.anual.filas : [];
  }

  /** Altura de la barrita en porcentaje. */
  altura(fila: FilaAnual): number {
    const maximo = Math.max(...this.filas.map((f) => f.diarios + f.fijos), 0);
    if (maximo <= 0) {
      return 0;
    }
    const proporcion = (fila.diarios + fila.fijos) / maximo;
    return Math.max(proporcion > 0 ? 8 : 0, Math.round(proporcion * 100));
  }

  titulo(fila: FilaAnual): string {
    const nombre = this.idiomas.mes(fila.mes);
    return fila.tieneDatos ? nombre : nombre + ' · ' + this.idiomas.t('cinta_sin_apuntes');
  }

  ir(mes: number): void {
    this.libros.seleccionarMes(mes);
  }
}
