import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../model/paciente';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteServiceService {
pacienteCambio = new Subject<Paciente[]>();
 
  url: string = `${environment.HOST}/pacientes`

  constructor( private http: HttpClient) {

  }

  listarPacientes(){
   return  this.http.get<Paciente[]>(this.url);
  }

  listarPorId(idPaciente: number){
    return  this.http.get<Paciente>(`${this.url}/${idPaciente}`);
   }

   registrar(paciente: Paciente){
    return  this.http.post(this.url, paciente);
   }

   modificar(paciente: Paciente){
    return  this.http.put(this.url, paciente);
   }

   eliminar(idPaciente: number){
    return  this.http.delete(`${this.url}/${idPaciente}`);
   }
}
