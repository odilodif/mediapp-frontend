import { Component, OnInit, SecurityContext } from '@angular/core';
import { ConsultaService } from '../../service/consulta.service';
import Chart, { ChartTypeRegistry } from 'chart.js/auto';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';




@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css',
  standalone: false
})
export class ReporteComponent implements OnInit {
  tipo: string;
  chart: any;
  pdfSrc: string = "";
  pdfSrc2: SafeResourceUrl | undefined = undefined;

  archivosSeleccionados: FileList;
  archivoSeleccionado:  File | any = null;
  nombreArchivo: string;

  imagenData:any;
  imagenEstado:boolean;

  isBrowser: boolean;
  selectedFileB64: string = "";
  isFileDocument = true;
  constructor(
    private consultaService: ConsultaService, private sanitizer: DomSanitizer
  ) {


  }

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
      console.log(data);
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        const blobUrl = URL.createObjectURL(data);
        this.selectedFileB64 = blobUrl;
      }

      // reader.readAsArrayBuffer(data);



    })
  }

  descargarReporte() {

  }


  generarReportePdfViewer() {
    this.consultaService.generarReporte().subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.pdfSrc = url; // Usar directamente el URL generado.
        console.log('RESULT: ' + this.pdfSrc);
      },
      error: (err) => {
        console.error('Error loading PDF:', err);
      },
    });
  }




  downloadPdf() {
    this.consultaService.generarReporte().subscribe(data => {
      // Crea una URL de objeto a partir del Blob
      const blobUrl = URL.createObjectURL(data);

      // Abre el archivo PDF en una nueva pestaña
      window.open(blobUrl, '_blank');

      // Descarga el archivo automáticamente
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'reporte.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Libera los recursos de la URL de objeto
      URL.revokeObjectURL(blobUrl);
    });
  }

  seleccionarArchivo(e: any) {
    //console.log(e);
    this.nombreArchivo= e.target.files[0].name;
    this.archivosSeleccionados= e.target.files;

  }

  subirArchivo(){
    this.archivoSeleccionado=this.archivosSeleccionados.item(0);
    this.consultaService.guardarArchivo(this.archivoSeleccionado).subscribe(data => console.log(data));
  }


}
