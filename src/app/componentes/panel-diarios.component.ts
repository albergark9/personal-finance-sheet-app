import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Apunte, LibroAnual } from '../modelos/libro.modelo';
import { ResumenMes } from '../modelos/resumen.modelo';
import { ETIQUETAS_SEMANA, datosDeMes, indiceSemana, redondear } from '../servicios/calculos';
import { Incidencia } from '../servicios/libro-json';
import { LibroService } from '../servicios/libro.service';

interface GrupoSemana {
  numero: number;
  etiqueta: string;
  apuntes: Apunte[];
  total: number;
}

@Component({
  selector: 'fc-panel-diarios',
  templateUrl: './panel-diarios.component.html'
})
export class PanelDiariosComponent implements OnChanges {
  @Input() libro: LibroAnual | null = null;
  @Input() mes = 1;
  @Input() resumen: ResumenMes | null = null;

  readonly etiquetasSemana = ETIQUETAS_SEMANA;

  semanas: GrupoSemana[] = [];

  fecha = '';
  categoria = '';
  concepto = '';
  importe: number | null = null;
  error: Incidencia | null = null;

  nuevaCategoria = '';
  anadiendoCategoria = false;

  constructor(private readonly libros: LibroService) {}

  ngOnChanges(cambios: SimpleChanges): void {
    if (cambios['mes'] || cambios['libro']) {
      this.agrupar();
      this.ponerValoresPorDefecto(Boolean(cambios['mes']));
    }
  }

  get categorias(): string[] {
    return this.libro ? this.libro.categorias : [];
  }

  apuntar(): void {
    const error = this.libros.anadirGasto({
      fecha: this.fecha,
      categoria: this.categoria,
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

  borrar(apunte: Apunte): void {
    this.libros.borrarGasto(this.mes, apunte.id);
  }

  abrirCategoria(): void {
    this.anadiendoCategoria = true;
    this.nuevaCategoria = '';
  }

  guardarCategoria(): void {
    const error = this.libros.anadirCategoria(this.nuevaCategoria);
    if (error) {
      this.error = error;
      return;
    }
    this.error = null;
    this.categoria = this.nuevaCategoria.trim();
    this.nuevaCategoria = '';
    this.anadiendoCategoria = false;
  }

  cancelarCategoria(): void {
    this.anadiendoCategoria = false;
    this.nuevaCategoria = '';
  }

  /** Agrupa los gastos del mes por semana, que es como se repasan. */
  private agrupar(): void {
    const grupos: GrupoSemana[] = ETIQUETAS_SEMANA.map((etiqueta, i) => ({
      numero: i + 1,
      etiqueta,
      apuntes: [],
      total: 0
    }));
    if (this.libro) {
      for (const apunte of datosDeMes(this.libro, this.mes).gastos) {
        const i = indiceSemana(apunte.fecha);
        if (i < 0) {
          continue;
        }
        grupos[i].apuntes.push(apunte);
        grupos[i].total = redondear(grupos[i].total + apunte.importe);
      }
    }
    this.semanas = grupos.filter((g) => g.apuntes.length > 0);
  }

  /**
   * Propone hoy si estamos en el mes en curso y, si no, el dia 1 del mes que se
   * esta mirando: asi apuntar un gasto es escribir importe y darle a Enter.
   */
  private ponerValoresPorDefecto(cambioDeMes: boolean): void {
    const libro = this.libro;
    if (!libro) {
      return;
    }
    const prefijo = libro.anio + '-' + this.dosDigitos(this.mes);
    if (cambioDeMes || this.fecha === '' || !this.fecha.startsWith(prefijo)) {
      const hoy = new Date();
      const dia =
        hoy.getFullYear() === libro.anio && hoy.getMonth() + 1 === this.mes ? hoy.getDate() : 1;
      this.fecha = prefijo + '-' + this.dosDigitos(dia);
    }
    if (this.categoria === '' || !libro.categorias.includes(this.categoria)) {
      this.categoria = libro.categorias.length > 0 ? libro.categorias[0] : '';
    }
  }

  private dosDigitos(valor: number): string {
    return valor < 10 ? '0' + valor : String(valor);
  }
}
