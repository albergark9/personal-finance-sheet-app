import { Pipe, PipeTransform } from '@angular/core';

import { TraduccionService } from '../servicios/traduccion.service';

/** Convierte 2026-07-03 en "vie 3 jul", "Fri 3 Jul", "Fr., 3. Juli"… */
@Pipe({ name: 'fechaCorta', pure: false })
export class FechaCortaPipe implements PipeTransform {
  constructor(private readonly idiomas: TraduccionService) {}

  transform(fechaISO: string | null | undefined): string {
    return this.idiomas.fechaCorta(fechaISO);
  }
}
