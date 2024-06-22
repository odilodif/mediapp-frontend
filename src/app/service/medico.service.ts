import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Medico } from '../model/medico';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  medicoCambio = new Subject<Medico[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/medicos`
  constructor(private http: HttpClient) { 

  }

  listarMedico() {
    return this.http.get<Medico[]>(this.url);
  }

  listarPorId(idMedico: number) {
    return this.http.get<Medico>(`${this.url}/${idMedico}`);
  }

  registrar(Medico: Medico) {
    return this.http.post(this.url, Medico);
  }

  modificar(Medico: Medico) {
    return this.http.put(this.url, Medico);
  }

  eliminar(idMedico: number) {
    return this.http.delete(`${this.url}/${idMedico}`);
  }
}
