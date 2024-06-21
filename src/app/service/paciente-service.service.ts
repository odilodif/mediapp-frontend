import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../model/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteServiceService {

 
  url: string = `${environment.HOST}/pacientes`

  constructor( private http: HttpClient) {

  }

  listarPacientes(){
   return  this.http.get<Paciente[]>(this.url);
  }
}
