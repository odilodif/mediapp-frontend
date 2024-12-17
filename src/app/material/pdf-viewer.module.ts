import { NgModule } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [PdfViewerModule],
  exports: [PdfViewerModule],
})
export class PdfViewerClientModule {}
