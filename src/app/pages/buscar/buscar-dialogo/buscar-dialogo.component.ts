import { Component, Inject, OnInit } from '@angular/core';
import { Consulta } from '../../../model/consulta';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConsultaListaExamenDTO } from '../../../dto/consultaListaExamenTDO';
import { ConsultaService } from '../../../service/consulta.service';
import { ConsultaExamen } from '../../../model/consultaexamen';

@Component({
    selector: 'app-buscar-dialogo',
    templateUrl: './buscar-dialogo.component.html',
    styleUrl: './buscar-dialogo.component.css',
    standalone: false
})
export class BuscarDialogoComponent implements OnInit {
  consulta: Consulta;
  examenes: ConsultaExamen[];

  constructor(
    private dialogRef: MatDialogRef<BuscarDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Consulta,
    private consultaService: ConsultaService
  ) {

  }

  ngOnInit(): void {
    this.consulta = this.data;
    this.listarExamenes();
  }
  listarExamenes() {
    this.consultaService.listarExamenPorConsulta(this.consulta.idConsulta).subscribe((data) => {
      this.examenes = data;
      
    })
  }

  cancelar() {
    this.dialogRef.close();
  }

}
