import { Pipe, PipeTransform } from '@angular/core';

import { TraduccionService } from '../servicios/traduccion.service';

/** Fracciones a porcentaje con el formato del idioma: 0,4188 -> 41,9 %. */
@Pipe({ name: 'porcentaje', pure: false })
export class PorcentajePipe implements PipeTransform {
  constructor(private readonly idiomas: TraduccionService) {}

  transform(valor: number | null | undefined): string {
    return this.idiomas.porcentaje(valor);
  }
}
