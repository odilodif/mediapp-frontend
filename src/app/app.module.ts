import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { PacienteComponentComponent } from './pages/paciente-component/paciente-component.component';
import { MedicoComponentComponent } from './pages/medico-component/medico-component.component';
import {HttpClientModule } from '@angular/common/http';
import { PacienteEdicionComponent } from './pages/paciente-component/paciente-edicion/paciente-edicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicoDialogComponent } from './pages/medico-component/medico-dialog/medico-dialog.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { WizardComponent } from './pages/consulta/wizard/wizard.component';
import { HomeComponent } from './pages/home/home/home.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { BuscarDialogoComponent } from './pages/buscar/buscar-dialogo/buscar-dialogo.component';
import { ReporteComponent } from './pages/reporte/reporte.component';

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponentComponent,
    MedicoComponentComponent,
    PacienteEdicionComponent,
    MedicoDialogComponent,
    EspecialidadComponent,
    ExamenComponent,
    ExamenEdicionComponent,
    EspecialidadEdicionComponent,
    ConsultaComponent,
    EspecialComponent,
    WizardComponent,
    HomeComponent,
    BuscarComponent,
    BuscarDialogoComponent,
    ReporteComponent
  ],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
