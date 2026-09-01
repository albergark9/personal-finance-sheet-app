import { Injectable } from '@angular/core';

import { LibroAnual } from '../modelos/libro.modelo';
import {
  ResultadoLectura,
  libroDesdeTexto,
  nombreFicheroLibro,
  serializarLibro
} from './libro-json';
import { TraduccionService } from './traduccion.service';

export { Incidencia, ResultadoLectura } from './libro-json';

/**
 * Lo que necesita navegador: leer el fichero que elige el usuario y lanzar la
 * descarga. La validación y el formato del JSON están en libro-json.ts, sin
 * dependencias de Angular.
 */
@Injectable({ providedIn: 'root' })
export class ArchivoService {
  constructor(private readonly idiomas: TraduccionService) {}

  /** Lee un fichero elegido en el input y devuelve el libro ya validado. */
  leer(fichero: File): Promise<ResultadoLectura> {
    return new Promise<ResultadoLectura>((resolver) => {
      const lector = new FileReader();

      lector.onerror = () =>
        resolver({ libro: null, error: { clave: 'json_lectura_fallida' }, avisos: [] });

      lector.onload = () => {
        const texto = typeof lector.result === 'string' ? lector.result : '';
        resolver(this.desdeTexto(texto));
      };

      lector.readAsText(fichero, 'utf-8');
    });
  }

  desdeTexto(texto: string): ResultadoLectura {
    return libroDesdeTexto(texto, this.idiomas.nombresIniciales());
  }

  serializar(libro: LibroAnual): string {
    return serializarLibro(libro, this.idiomas.idioma);
  }

  nombreFichero(libro: LibroAnual): string {
    return nombreFicheroLibro(libro);
  }

  /** Lanza la descarga del fichero en el navegador. */
  descargar(libro: LibroAnual): void {
    const contenido = this.serializar(libro);
    const blob = new Blob([contenido], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = this.nombreFichero(libro);
    enlace.style.display = 'none';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    // Se libera después de que el navegador haya cogido el blob.
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
}
