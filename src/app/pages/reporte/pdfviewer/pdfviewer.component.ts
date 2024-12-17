import { Component } from '@angular/core';
import { NgxExtendedPdfViewerService, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
@Component({
  selector: 'app-pdfviewer',
  standalone: false,
  
  templateUrl: './pdfviewer.component.html',
  styleUrl: './pdfviewer.component.css'
})
export class PdfviewerComponent {
  title = 'cpdf-viewer';
  selectedFile: any = "";
  selectedFilePath: string = "";
  selectedFileB64: string = "";
  isFileImage = false;
  isFileDocument = false;

  constructor(private pdfService: NgxExtendedPdfViewerService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    if (this.selectedFile) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        let path = event.target != null ? event.target.result : "";
        this.selectedFilePath = path as string;
        this.selectedFileB64 = this.selectedFilePath.split(",")[1];
        if (this.selectedFilePath.includes("image")) {
          this.isFileImage = true;
          this.isFileDocument = false;
        } else {
          this.isFileImage = false;
          this.isFileDocument = true;
        }
      };
    }
  }
}
