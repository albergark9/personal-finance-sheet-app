import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LibroAnual } from './modelos/libro.modelo';
import { Nota } from './modelos/nota.modelo';
import { ResumenAnual, ResumenMes } from './modelos/resumen.modelo';
import { ArchivoService } from './servicios/archivo.service';
import { LibroService } from './servicios/libro.service';
import { TraduccionService } from './servicios/traduccion.service';

@Component({
  selector: 'fc-raiz',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  libro: LibroAnual | null = null;
  mes = 1;
  sucio = false;
  resumen: ResumenMes | null = null;
  anual: ResumenAnual | null = null;
  notas: Nota[] = [];

  private readonly subs = new Subscription();

  constructor(
    private readonly libros: LibroService,
    private readonly archivos: ArchivoService,
    private readonly idiomas: TraduccionService
  ) {}

  ngOnInit(): void {
    this.subs.add(this.libros.libro$.subscribe((libro) => (this.libro = libro)));
    this.subs.add(this.libros.mes$.subscribe((mes) => (this.mes = mes)));
    this.subs.add(this.libros.sucio$.subscribe((sucio) => (this.sucio = sucio)));
    this.subs.add(this.libros.resumenMes$.subscribe((resumen) => (this.resumen = resumen)));
    this.subs.add(this.libros.resumenAnual$.subscribe((anual) => (this.anual = anual)));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  get nombreFichero(): string {
    return this.libro ? this.archivos.nombreFichero(this.libro) : '';
  }

  /** Avisa si hay cambios sin descargar y se intenta cerrar la pestaña. */
  @HostListener('window:beforeunload', ['$event'])
  alSalir(evento: BeforeUnloadEvent): void {
    if (this.sucio) {
      evento.preventDefault();
      evento.returnValue = this.idiomas.t('confirmar_salir');
    }
  }

  crearLibro(anio: number): void {
    this.libros.crear(anio);
    this.notas = [{ tipo: 'ok', incidencia: { clave: 'aviso_creado', params: { anio } } }];
  }

  abrirLibro(libro: LibroAnual): void {
    this.libros.abrir(libro);
  }

  avisar(nota: Nota): void {
    this.notas = [...this.notas, nota];
  }

  descargar(): void {
    const libro = this.libro;
    if (!libro) {
      return;
    }
    const fichero = this.archivos.nombreFichero(libro);
    this.archivos.descargar(libro);
    this.libros.marcarGuardado();
    this.notas = [{ tipo: 'ok', incidencia: { clave: 'aviso_descargado', params: { fichero } } }];
  }

  cambiarDeAnio(): void {
    if (this.sucio && !window.confirm(this.idiomas.t('confirmar_cerrar'))) {
      return;
    }
    this.libros.cerrar();
    this.notas = [];
  }

  cerrarNota(indice: number): void {
    this.notas = this.notas.filter((_, i) => i !== indice);
  }
}
