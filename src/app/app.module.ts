import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BarraComponent } from './componentes/barra.component';
import { CintaMesesComponent } from './componentes/cinta-meses.component';
import { InicioComponent } from './componentes/inicio.component';
import { PanelAnualComponent } from './componentes/panel-anual.component';
import { PanelCategoriasComponent } from './componentes/panel-categorias.component';
import { PanelDiariosComponent } from './componentes/panel-diarios.component';
import { PanelFijosComponent } from './componentes/panel-fijos.component';
import { PanelIngresosComponent } from './componentes/panel-ingresos.component';
import { PanelResumenComponent } from './componentes/panel-resumen.component';
import { SelectorIdiomaComponent } from './componentes/selector-idioma.component';
import { EurosPipe } from './pipes/euros.pipe';
import { FechaCortaPipe } from './pipes/fecha-corta.pipe';
import { MesPipe } from './pipes/mes.pipe';
import { PorcentajePipe } from './pipes/porcentaje.pipe';
import { TPipe } from './pipes/t.pipe';

/**
 * No se registra ningún LOCALE_ID de Angular: el idioma cambia en caliente y
 * todo el formato pasa por TraduccionService, que usa Intl con el locale del
 * idioma activo. Así no hace falta compilar un bundle por idioma.
 */
@NgModule({
  declarations: [
    AppComponent,
    BarraComponent,
    CintaMesesComponent,
    InicioComponent,
    PanelAnualComponent,
    PanelCategoriasComponent,
    PanelDiariosComponent,
    PanelFijosComponent,
    PanelIngresosComponent,
    PanelResumenComponent,
    SelectorIdiomaComponent,
    EurosPipe,
    FechaCortaPipe,
    MesPipe,
    PorcentajePipe,
    TPipe
  ],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
