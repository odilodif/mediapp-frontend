import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ConsultaListaExamenDTO } from '../dto/consultaListaExamenTDO';
import { FiltroConsultaDTO } from '../dto/filtroConsultaDTO';
import { Consulta } from '../model/consulta';
import { ConsultaExamen } from '../model/consultaexamen';
import { ConsultaResumenDTO } from '../dto/ConsultaResumenDTO';
import { Observable } from 'rxjs';

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

  /*generarReporte(){
    return this.http.get(`${this.url}/generarReporte`,{
      responseType:'blob'
    });
  }*/


 generarReporte(): Observable<any> {
    return this.http.get(`${this.url}/generarReporte`,{
      responseType: 'blob', // Para obtener el archivo como Blob
      observe: 'response',  // Para acceder a los encabezados
    });
  }


  generarReportePdfViewer(){
    return this.http.get(`${this.url}/generarReportePdfViewer`,{
      responseType:'blob',
       observe: 'response', 
    });
  }

  guardarArchivo(data:File){
    let formdata: FormData = new FormData();//Se crea porque no tenemos formulario(Form)en el HTML
    formdata.append('adjunto',data);
    return this.http.post(`${this.url}/guardarArchivo`,formdata)

  }

}
