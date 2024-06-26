import { Injectable } from '@angular/core';
import { Especialidad } from '../model/especialidad';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  especialidadCambio = new Subject<Especialidad[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/especialidades`
  constructor(private http: HttpClient) { 

  }

  listarEspecialidad() {
    return this.http.get<Especialidad[]>(this.url);
  }

  listarPorId(idEspecialidad: number) {
    return this.http.get<Especialidad>(`${this.url}/${idEspecialidad}`);
  }

  registrar(Especialidad: Especialidad) {
    return this.http.post(this.url, Especialidad);
  }

  modificar(Especialidad: Especialidad) {
    return this.http.put(this.url, Especialidad);
  }

  eliminar(idEspecialidad: number) {
    return this.http.delete(`${this.url}/${idEspecialidad}`);
  }
}
