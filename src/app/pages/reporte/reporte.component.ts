import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../service/consulta.service';
import { Chart, ChartTypeRegistry } from 'chart.js';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent implements OnInit {
  tipo: string;
  chart: any;

  constructor(
    private consultaService: ConsultaService
  ) {

  }
  ngOnInit(): void {
    this.tipo = 'line';
    this.dibujar();
  }


  dibujar() {
    this.consultaService.listarResumen().subscribe(data => {
      //console.log(data);
      let cantidades = data.map(x => x.cantidad);
      let fechas = data.map(x => x.fecha);

      
    });
  }

  cambiar(linea: string) {

  }
}
