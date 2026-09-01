import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Ingreso, LibroAnual } from '../modelos/libro.modelo';
import { ResumenMes } from '../modelos/resumen.modelo';
import { datosDeMes } from '../servicios/calculos';
import { Incidencia } from '../servicios/libro-json';
import { LibroService } from '../servicios/libro.service';

@Component({
  selector: 'fc-panel-ingresos',
  templateUrl: './panel-ingresos.component.html'
})
export class PanelIngresosComponent implements OnChanges {
  @Input() libro: LibroAnual | null = null;
  @Input() mes = 1;
  @Input() resumen: ResumenMes | null = null;

  entradas: Ingreso[] = [];

  fecha = '';
  origen = '';
  concepto = '';
  importe: number | null = null;
  error: Incidencia | null = null;

  nuevoOrigen = '';
  anadiendoOrigen = false;

  constructor(private readonly libros: LibroService) {}

  ngOnChanges(cambios: SimpleChanges): void {
    if (cambios['mes'] || cambios['libro']) {
      this.entradas = this.libro ? datosDeMes(this.libro, this.mes).ingresos : [];
      this.ponerValoresPorDefecto(Boolean(cambios['mes']));
    }
  }

  get origenes(): string[] {
    return this.libro ? this.libro.origenes : [];
  }

  anadir(): void {
    const error = this.libros.anadirIngreso({
      fecha: this.fecha,
      origen: this.origen,
      concepto: this.concepto,
      importe: this.importe === null ? NaN : this.importe
    });
    if (error) {
      this.error = error;
      return;
    }
    this.error = null;
    this.concepto = '';
    this.importe = null;
  }

  borrar(ingreso: Ingreso): void {
    this.libros.borrarIngreso(this.mes, ingreso.id);
  }

  abrirOrigen(): void {
    this.anadiendoOrigen = true;
    this.nuevoOrigen = '';
  }

  guardarOrigen(): void {
    const error = this.libros.anadirOrigen(this.nuevoOrigen);
    if (error) {
      this.error = error;
      return;
    }
    this.error = null;
    this.origen = this.nuevoOrigen.trim();
    this.nuevoOrigen = '';
    this.anadiendoOrigen = false;
  }

  cancelarOrigen(): void {
    this.anadiendoOrigen = false;
    this.nuevoOrigen = '';
  }

  private ponerValoresPorDefecto(cambioDeMes: boolean): void {
    const libro = this.libro;
    if (!libro) {
      return;
    }
    const prefijo = libro.anio + '-' + (this.mes < 10 ? '0' + this.mes : String(this.mes));
    if (cambioDeMes || this.fecha === '' || !this.fecha.startsWith(prefijo)) {
      const hoy = new Date();
      const dia =
        hoy.getFullYear() === libro.anio && hoy.getMonth() + 1 === this.mes ? hoy.getDate() : 1;
      this.fecha = prefijo + '-' + (dia < 10 ? '0' + dia : String(dia));
    }
    if (this.origen === '' || !libro.origenes.includes(this.origen)) {
      this.origen = libro.origenes.length > 0 ? libro.origenes[0] : '';
    }
  }
}
