import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../../service/consulta.service';


@Component({
  selector: 'app-reportepdfviewer',
  standalone: false,

  templateUrl: './reportepdfviewer.component.html',
  styleUrl: './reportepdfviewer.component.css'
})
export class ReportepdfviewerComponent implements OnInit {
  pdfSrc: string | undefined;
  blobData: Blob | undefined;
  fileName: string;
  constructor(private consultaService: ConsultaService) { }

  ngOnInit(): void {

  }

  /*viewReport() {
    this.consultaService.generarReporte().subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
       
        this.pdfSrc = url; // Usar directamente el URL generado.
        //this.pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  
        this.blobData = blob; 
        console.log('RESULT: '+this.pdfSrc);
      },
      error: (err) => {
        console.error('Error loading PDF:', err);
      },
    });
  }*/

  viewReport() {
    this.consultaService.generarReporte().subscribe({
      next: (resp) => {
        const blob = resp.body; // Contenido del archivo
        this.blobData = blob; 
        const contentDisposition = resp.headers.get('Content-Disposition');
        this.fileName = contentDisposition
          ? contentDisposition.split('filename=')[1].replace(/"/g, '')
          : 'reporte.pdf'; // Extraer el nombre del archivo

        console.log('Nombre del archivo:', this.fileName);
        // Crear una URL segura para el visor
        const url = URL.createObjectURL(blob);
        this.pdfSrc = url;

        // Forzar la descarga con un nombre específico
        const a = document.createElement('a');
        a.href = url;
        a.download = this.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

      }
    })
  }



  downloadPdf() {
    if (this.blobData) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(this.blobData);
      link.download = 'reporte.pdf'; // Nombre del archivo.
      link.click();
      URL.revokeObjectURL(link.href); // Liberar recursos.
    } else {
      console.error('No hay datos para descargar');
    }
  }




}
