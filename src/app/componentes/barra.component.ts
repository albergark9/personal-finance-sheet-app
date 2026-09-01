import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fc-barra',
  templateUrl: './barra.component.html'
})
export class BarraComponent {
  @Input() anio = 0;
  @Input() sucio = false;
  @Input() nombreFichero = '';

  @Output() descargar = new EventEmitter<void>();
  @Output() cambiarAnio = new EventEmitter<void>();
}
