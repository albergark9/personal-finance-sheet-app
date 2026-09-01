import { Component, Input } from '@angular/core';

import { FilaAnual, ResumenAnual } from '../modelos/resumen.modelo';
import { LibroService } from '../servicios/libro.service';

@Component({
  selector: 'fc-panel-anual',
  templateUrl: './panel-anual.component.html'
})
export class PanelAnualComponent {
  @Input() anual: ResumenAnual | null = null;
  @Input() anio = 0;
  @Input() mesActivo = 1;

  constructor(private readonly libros: LibroService) {}

  ir(fila: FilaAnual): void {
    this.libros.seleccionarMes(fila.mes);
  }
}
