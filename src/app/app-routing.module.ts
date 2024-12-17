import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponentComponent } from './pages/paciente-component/paciente-component.component';
import { MedicoComponentComponent } from './pages/medico-component/medico-component.component';
import { PacienteEdicionComponent } from './pages/paciente-component/paciente-edicion/paciente-edicion.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { WizardComponent } from './pages/consulta/wizard/wizard.component';
import { HomeComponent } from './pages/home/home/home.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { PdfviewerComponent } from './pages/reporte/pdfviewer/pdfviewer.component';
import { ReportepdfviewerComponent } from './pages/reporte/reportepdfviewer/reportepdfviewer.component';

const routes: Routes = [
  {
    path: '',component:HomeComponent
  },
  {
    path: 'paciente',
    component: PacienteComponentComponent, children: [
      { path: 'nuevo', component: PacienteEdicionComponent },
      { path: 'edicion/:id', component: PacienteEdicionComponent }
    ]
  },
  { path: 'medico', component: MedicoComponentComponent },
  {
    path: 'especialidad', component: EspecialidadComponent, children: [
      { path: 'nuevo', component: EspecialidadEdicionComponent },
      { path: 'edicion/:id', component: EspecialidadEdicionComponent }
    ]
  },
  {
    path: 'examen', component: ExamenComponent, children: [
      { path: 'nuevo', component: ExamenEdicionComponent },
      { path: 'edicion/:id', component: ExamenEdicionComponent }
    ]

  },
  { path: 'medico', component: MedicoComponentComponent },
  { path: 'consulta', component: ConsultaComponent },
  { path: 'consulta-especial', component: EspecialComponent },
  { path: 'consulta-wizard', component: WizardComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'reporte', component: ReporteComponent },
  { path: 'pdfviewer', component: PdfviewerComponent },
  { path: 'reprotepdfviewer', component: ReportepdfviewerComponent },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
