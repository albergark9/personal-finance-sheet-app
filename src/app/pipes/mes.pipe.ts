import { Pipe, PipeTransform } from '@angular/core';

import { TraduccionService } from '../servicios/traduccion.service';

/** Nombre del mes (1-12) en el idioma activo: `{{ 7 | mes }}`, `{{ 7 | mes: 'corto' }}`. */
@Pipe({ name: 'mes', pure: false })
export class MesPipe implements PipeTransform {
  constructor(private readonly idiomas: TraduccionService) {}

  transform(mes: number | null | undefined, forma: 'largo' | 'corto' = 'largo'): string {
    if (mes === null || mes === undefined || !Number.isFinite(mes)) {
      return '';
    }
    return this.idiomas.mes(mes, forma === 'largo');
  }
}
