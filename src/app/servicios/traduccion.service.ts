import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ClaveTexto, Textos } from '../i18n/es';
import {
  DICCIONARIOS,
  IDIOMAS,
  Idioma,
  detectarIdioma,
  esIdioma,
  fichaDe
} from '../i18n/idiomas';
import { NombresIniciales } from '../modelos/libro.modelo';

export type Parametros = Record<string, string | number>;

/**
 * Traducción en tiempo de ejecución: un solo bundle con los siete idiomas y un
 * selector que cambia el idioma sin recargar. También centraliza el formato de
 * cifras y fechas, que depende del idioma activo.
 */
@Injectable({ providedIn: 'root' })
export class TraduccionService {
  private readonly idiomaSujeto: BehaviorSubject<Idioma>;
  readonly idioma$: Observable<Idioma>;

  /** Intl es caro de construir: se guarda un formateador por idioma. */
  private readonly formatoEuros = new Map<string, Intl.NumberFormat>();
  private readonly formatoPorcentaje = new Map<string, Intl.NumberFormat>();
  private readonly formatoFecha = new Map<string, Intl.DateTimeFormat>();
  private readonly formatoMesLargo = new Map<string, Intl.DateTimeFormat>();
  private readonly formatoMesCorto = new Map<string, Intl.DateTimeFormat>();

  readonly idiomas = IDIOMAS;

  constructor() {
    const preferencias =
      typeof navigator === 'undefined'
        ? []
        : [...(navigator.languages ?? []), navigator.language].filter(
            (valor): valor is string => typeof valor === 'string'
          );
    this.idiomaSujeto = new BehaviorSubject<Idioma>(detectarIdioma(preferencias));
    this.idioma$ = this.idiomaSujeto.asObservable();
    this.marcarIdiomaEnHtml();
  }

  get idioma(): Idioma {
    return this.idiomaSujeto.value;
  }

  get locale(): string {
    return fichaDe(this.idioma).locale;
  }

  private get textos(): Textos {
    return DICCIONARIOS[this.idioma];
  }

  cambiar(idioma: string): void {
    if (esIdioma(idioma) && idioma !== this.idioma) {
      this.idiomaSujeto.next(idioma);
      this.marcarIdiomaEnHtml();
    }
  }

  /** Traduce una clave y sustituye los {parametros} que lleve. */
  t(clave: ClaveTexto, parametros?: Parametros): string {
    let texto = this.textos[clave];
    if (parametros) {
      for (const nombre of Object.keys(parametros)) {
        texto = texto.split('{' + nombre + '}').join(String(parametros[nombre]));
      }
    }
    return texto;
  }

  // ---- formato ----

  euros(valor: number | null | undefined, modo?: 'raya'): string {
    if (valor === null || valor === undefined || !Number.isFinite(valor)) {
      return '—';
    }
    if (modo === 'raya' && valor === 0) {
      return '—';
    }
    const locale = this.locale;
    let formato = this.formatoEuros.get(locale);
    if (!formato) {
      formato = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      this.formatoEuros.set(locale, formato);
    }
    return formato.format(valor);
  }

  porcentaje(valor: number | null | undefined): string {
    if (valor === null || valor === undefined || !Number.isFinite(valor)) {
      return '—';
    }
    const locale = this.locale;
    let formato = this.formatoPorcentaje.get(locale);
    if (!formato) {
      formato = new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });
      this.formatoPorcentaje.set(locale, formato);
    }
    return formato.format(valor);
  }

  /** "vie 3 jul", "Fri 3 Jul", "Fr., 3. Juli"… según el idioma. */
  fechaCorta(fechaISO: string | null | undefined): string {
    if (!fechaISO) {
      return '';
    }
    const trozos = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fechaISO);
    if (!trozos) {
      return fechaISO;
    }
    const fecha = new Date(Number(trozos[1]), Number(trozos[2]) - 1, Number(trozos[3]));
    const locale = this.locale;
    let formato = this.formatoFecha.get(locale);
    if (!formato) {
      formato = new Intl.DateTimeFormat(locale, {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      });
      this.formatoFecha.set(locale, formato);
    }
    return formato.format(fecha);
  }

  /** Nombre del mes, con mes de 1 a 12. */
  mes(mes: number, largo = true): string {
    const fecha = new Date(2001, Math.min(11, Math.max(0, mes - 1)), 1);
    const locale = this.locale;
    const cache = largo ? this.formatoMesLargo : this.formatoMesCorto;
    let formato = cache.get(locale);
    if (!formato) {
      formato = new Intl.DateTimeFormat(locale, { month: largo ? 'long' : 'short' });
      cache.set(locale, formato);
    }
    const nombre = formato.format(fecha);
    return largo ? nombre.charAt(0).toLocaleUpperCase(locale) + nombre.slice(1) : nombre;
  }

  /**
   * Los nombres con los que arranca un libro nuevo, en el idioma activo. Las
   * marcas (Wallapop, BlaBlaCar, Bizum) no se traducen.
   */
  nombresIniciales(): NombresIniciales {
    const catfijoVivienda = this.t('catfijo_vivienda');
    const catfijoSuministros = this.t('catfijo_suministros');
    const catfijoSalud = this.t('catfijo_salud');
    return {
      categorias: [
        this.t('cat_gasolina'),
        this.t('cat_comida'),
        this.t('cat_ocio'),
        this.t('cat_extras')
      ],
      origenes: [
        this.t('ori_nomina'),
        'Wallapop',
        'BlaBlaCar',
        'Bizum',
        this.t('ori_devoluciones'),
        this.t('ori_otros')
      ],
      categoriasFijos: [
        catfijoVivienda,
        catfijoSuministros,
        this.t('catfijo_suscripciones'),
        catfijoSalud,
        this.t('catfijo_transporte'),
        this.t('catfijo_otros')
      ],
      fijos: [
        { concepto: this.t('fijo_alquiler'), categoria: catfijoVivienda, diaCargo: 1 },
        { concepto: this.t('fijo_internet'), categoria: catfijoSuministros, diaCargo: 5 },
        { concepto: this.t('fijo_luz'), categoria: catfijoSuministros, diaCargo: 10 },
        { concepto: this.t('fijo_agua'), categoria: catfijoSuministros, diaCargo: 15 },
        { concepto: this.t('fijo_gimnasio'), categoria: catfijoSalud, diaCargo: 1 }
      ]
    };
  }

  private marcarIdiomaEnHtml(): void {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.idioma;
    }
  }
}
