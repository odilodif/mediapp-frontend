import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ConsultaListaExamenDTO } from '../dto/consultaListaExamenTDO';
import { FiltroConsultaDTO } from '../dto/filtroConsultaDTO';
import { Consulta } from '../model/consulta';
import { ConsultaExamen } from '../model/consultaexamen';
import { ConsultaResumenDTO } from '../dto/ConsultaResumenDTO';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  url: string = `${environment.HOST}/consultas`;
  constructor(
    private http: HttpClient
  ) {

  }

  registrar(consultaDTO: ConsultaListaExamenDTO) {
    return this.http.post(this.url, consultaDTO);
  }

  buscar(filtroConsulta: FiltroConsultaDTO) {
    return this.http.post<Consulta[]>(`${this.url}/buscar`, filtroConsulta);
  }

  listarExamenPorConsulta(idConsulta: number) {
    return this.http.get<ConsultaExamen[]>(`${environment.HOST}/consultaexamenes/${idConsulta}`);
  }

  listarResumen(){
    return this.http.get<ConsultaResumenDTO[]>(`${this.url}/listarResumen`);
  }

  generarReporte(){
    return this.http.get(`${this.url}/generarReporte`,{
      responseType:'blob'
    });
  }
}
