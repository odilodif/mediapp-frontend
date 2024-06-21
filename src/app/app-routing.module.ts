import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponentComponent } from './pages/paciente-component/paciente-component.component';
import { MedicoComponentComponent } from './pages/medico-component/medico-component.component';

const routes: Routes = [
  {
    path:'paciente',
    component:PacienteComponentComponent
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
