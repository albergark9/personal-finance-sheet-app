import { Textos } from './es';
import { de } from './de';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { it } from './it';
import { pt } from './pt';
import { ru } from './ru';

export type Idioma = 'es' | 'en' | 'pt' | 'it' | 'fr' | 'ru' | 'de';

export interface FichaIdioma {
  codigo: Idioma;
  /** El nombre del idioma en el propio idioma: es lo que se lee en el selector. */
  nombre: string;
  /** Locale que se le pasa a Intl para formatear cifras y fechas. */
  locale: string;
}

/**
 * El orden es el del selector. Para el inglés se usa en-IE porque es el locale
 * anglófono de la zona euro: da "€1,234.56" en vez de convertir nada.
 */
export const IDIOMAS: ReadonlyArray<FichaIdioma> = [
  { codigo: 'es', nombre: 'Español', locale: 'es-ES' },
  { codigo: 'en', nombre: 'English', locale: 'en-IE' },
  { codigo: 'pt', nombre: 'Português', locale: 'pt-PT' },
  { codigo: 'it', nombre: 'Italiano', locale: 'it-IT' },
  { codigo: 'fr', nombre: 'Français', locale: 'fr-FR' },
  { codigo: 'ru', nombre: 'Русский', locale: 'ru-RU' },
  { codigo: 'de', nombre: 'Deutsch', locale: 'de-DE' }
];

export const DICCIONARIOS: Record<Idioma, Textos> = { es, en, pt, it, fr, ru, de };

export const IDIOMA_POR_DEFECTO: Idioma = 'es';

export function esIdioma(valor: unknown): valor is Idioma {
  return typeof valor === 'string' && IDIOMAS.some((i) => i.codigo === valor);
}

export function fichaDe(idioma: Idioma): FichaIdioma {
  const ficha = IDIOMAS.find((i) => i.codigo === idioma);
  return ficha ?? IDIOMAS[0];
}

/**
 * Elige idioma a partir de los que pide el navegador. Solo mira las dos primeras
 * letras, así que "pt-BR" y "de-AT" también valen.
 */
export function detectarIdioma(preferencias: readonly string[]): Idioma {
  for (const preferencia of preferencias) {
    const corto = preferencia.slice(0, 2).toLowerCase();
    if (esIdioma(corto)) {
      return corto;
    }
  }
  return IDIOMA_POR_DEFECTO;
}
