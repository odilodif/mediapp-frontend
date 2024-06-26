import { Injectable } from '@angular/core';
import { Examen } from '../model/examen';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  examenCambio = new Subject<Examen[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/examenes`
  constructor(private http: HttpClient) { 

  }
  listarExamen() {
    return this.http.get<Examen[]>(this.url);
  }

  listarPorId(idExamen: number) {
    return this.http.get<Examen>(`${this.url}/${idExamen}`);
  }

  registrar(Examen: Examen) {
    return this.http.post(this.url, Examen);
  }

  modificar(Examen: Examen) {
    return this.http.put(this.url, Examen);
  }

  eliminar(idExamen: number) {
    return this.http.delete(`${this.url}/${idExamen}`);
  }

}
