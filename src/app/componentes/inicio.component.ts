import { Component, EventEmitter, Output } from '@angular/core';

import { LibroAnual } from '../modelos/libro.modelo';
import { Nota } from '../modelos/nota.modelo';
import { ArchivoService } from '../servicios/archivo.service';
import { Incidencia } from '../servicios/libro-json';

@Component({
  selector: 'fc-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent {
  @Output() crear = new EventEmitter<number>();
  @Output() abrir = new EventEmitter<LibroAnual>();
  @Output() aviso = new EventEmitter<Nota>();

  anio: number | null = new Date().getFullYear();
  error: Incidencia | null = null;
  leyendo = false;

  constructor(private readonly archivos: ArchivoService) {}

  crearLibro(): void {
    const anio = this.anio;
    if (anio === null || !Number.isInteger(anio) || anio < 2000 || anio > 2100) {
      this.error = { clave: 'error_anio' };
      return;
    }
    this.error = null;
    this.crear.emit(anio);
  }

  async alElegirFichero(evento: Event): Promise<void> {
    const entrada = evento.target as HTMLInputElement;
    const fichero = entrada.files && entrada.files.length > 0 ? entrada.files[0] : null;
    if (!fichero) {
      return;
    }

    this.leyendo = true;
    this.error = null;
    const resultado = await this.archivos.leer(fichero);
    this.leyendo = false;
    // Se limpia el input para poder volver a elegir el mismo fichero.
    entrada.value = '';

    if (!resultado.libro) {
      this.error = resultado.error;
      return;
    }

    for (const incidencia of resultado.avisos) {
      this.aviso.emit({ tipo: 'aviso', incidencia });
    }
    this.abrir.emit(resultado.libro);
  }
}
