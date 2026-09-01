import { Pipe, PipeTransform } from '@angular/core';

import { ClaveTexto } from '../i18n/es';
import { Parametros, TraduccionService } from '../servicios/traduccion.service';

/**
 * `{{ 'clave' | t }}` o `{{ 'clave' | t: { n: 3 } }}`.
 *
 * Impuro a propósito: al cambiar de idioma no cambia ninguna entrada del pipe,
 * así que uno puro se quedaría con el texto viejo. Recalcular es barato porque
 * es una búsqueda en un objeto.
 */
@Pipe({ name: 't', pure: false })
export class TPipe implements PipeTransform {
  constructor(private readonly idiomas: TraduccionService) {}

  transform(clave: ClaveTexto, parametros?: Parametros): string {
    return this.idiomas.t(clave, parametros);
  }
}
