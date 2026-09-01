import { Incidencia } from '../servicios/libro-json';

/** Mensaje que la aplicación muestra en la parte de arriba del lienzo. */
export interface Nota {
  tipo: 'ok' | 'aviso' | 'error';
  incidencia: Incidencia;
}
