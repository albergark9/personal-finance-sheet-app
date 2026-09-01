import { Pipe, PipeTransform } from '@angular/core';

import { TraduccionService } from '../servicios/traduccion.service';

/**
 * Importes en euros con el formato del idioma activo: 1.234,56 € en español,
 * €1,234.56 en inglés, 1 234,56 € en ruso… La moneda es siempre el euro; lo
 * único que cambia es cómo se escribe.
 *
 * Con el argumento 'raya' los ceros se muestran como — para que las tablas no
 * se llenen de 0,00 € y se lea solo lo que tiene contenido.
 */
@Pipe({ name: 'euros', pure: false })
export class EurosPipe implements PipeTransform {
  constructor(private readonly idiomas: TraduccionService) {}

  transform(valor: number | null | undefined, modo?: 'raya'): string {
    return this.idiomas.euros(valor, modo);
  }
}
