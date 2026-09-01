import { Component, Input } from '@angular/core';

import { FichaIdioma } from '../i18n/idiomas';
import { TraduccionService } from '../servicios/traduccion.service';

/**
 * Selector de idioma. Cambia la interfaz al momento, sin recargar: los siete
 * idiomas van en el mismo bundle.
 */
@Component({
  selector: 'fc-selector-idioma',
  templateUrl: './selector-idioma.component.html'
})
export class SelectorIdiomaComponent {
  /** 'barra' en la cabecera, 'portada' en la pantalla inicial. */
  @Input() sitio: 'barra' | 'portada' = 'barra';

  constructor(private readonly idiomas: TraduccionService) {}

  get opciones(): ReadonlyArray<FichaIdioma> {
    return this.idiomas.idiomas;
  }

  get actual(): string {
    return this.idiomas.idioma;
  }

  cambiar(evento: Event): void {
    const selector = evento.target as HTMLSelectElement;
    this.idiomas.cambiar(selector.value);
  }
}
