import { Component, Inject, OnInit } from '@angular/core';
import { Medico } from '../../../model/medico';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-medico-dialog',
  templateUrl: './medico-dialog.component.html',
  styleUrl: './medico-dialog.component.css'
})
export class MedicoDialogComponent implements OnInit {
  medico: Medico
  constructor(
    private dialogRef: MatDialogRef<MedicoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Medico
  ) {

  }
  ngOnInit(): void {
    /*this.medico = this.data; si quiero que se mdifique el hijo y el padre*/ 
    this.medico = new Medico();
    this.medico.idMedico= this.data.idMedico;
    this.medico.nombres= this.data.nombres
    this.medico.apellidos= this.data.apellidos;
    this.medico.cmp= this.data.cmp;
    this.medico.fotoUrl= this.data.fotoUrl;
  }
  operar(){

  }
  cancelar(){
    this.dialogRef.close();
  }
}
