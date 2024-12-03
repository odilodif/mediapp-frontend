import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../service/consulta.service';
import Chart, { ChartTypeRegistry } from 'chart.js/auto';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css',
  standalone: false
})
export class ReporteComponent implements OnInit {
  tipo: string;
  chart: any;
  pdfSrc: string;
  constructor(
    private consultaService: ConsultaService
  ) { }

  ngOnInit() {
    this.tipo = 'line';
    this.dibujar();
  }

  dibujar() {
    this.consultaService.listarResumen().subscribe(data => {
      //console.log(data);
      let cantidades = data.map(x => x.cantidad);
      let fechas = data.map(x => x.fecha);

      /////////////////CHART///////////////////////
      this.chart = new Chart('canvas', {
        type: this.tipo as keyof ChartTypeRegistry,
        data: {
          labels: fechas,
          datasets: [
            {
              label: 'Cantidad',
              data: cantidades,
              borderColor: '#3cba9f',
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(225, 159, 64, 0.2)',
              ],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              display: true,
            },
            y: {
              display: true,
            },
          },
        },
      });
      ///////////////////////////

    });
  }

  cambiar(tip: string) {
    this.tipo = tip;
    if (this.chart != null) {
      this.chart.destroy();
      console.log('DESTROY');
    }
    this.dibujar()

  }

  generarReporte() {
    this.consultaService.generarReporte().subscribe(data => {
      //console.log(data);
      /*let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        console.log(this.pdfSrc);
      }

      reader.readAsArrayBuffer(data);*/
    })
  }

  descargarReporte() {

  }
}
