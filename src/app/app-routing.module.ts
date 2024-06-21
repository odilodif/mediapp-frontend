import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponentComponent } from './pages/paciente-component/paciente-component.component';
import { MedicoComponentComponent } from './pages/medico-component/medico-component.component';
import { PacienteEdicionComponent } from './pages/paciente-component/paciente-edicion/paciente-edicion.component';

const routes: Routes = [
  {
    path:'paciente',
    component:PacienteComponentComponent,children:[
      {path:'nuevo',component:PacienteEdicionComponent}
    ]
  },
  {
    path:'medico',
    component:MedicoComponentComponent
  },
  {
    path:'**',
    redirectTo:'',
    pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
