import { Component, Inject, OnInit } from '@angular/core';
import { Medico } from '../../../model/medico';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicoService } from '../../../service/medico.service';
import {switchMap} from 'rxjs/operators';
@Component({
  selector: 'app-medico-dialog',
  templateUrl: './medico-dialog.component.html',
  styleUrl: './medico-dialog.component.css'
})
export class MedicoDialogComponent implements OnInit {
  medico: Medico
  constructor(
    private dialogRef: MatDialogRef<MedicoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Medico,
    private medicoService: MedicoService
  ) {

  }
  ngOnInit(): void {
    /*this.medico = this.data; si quiero que se mdifique el hijo y el padre*/
    this.medico = new Medico();
    this.medico.idMedico = this.data.idMedico;
    this.medico.nombres = this.data.nombres
    this.medico.apellidos = this.data.apellidos;
    this.medico.cmp = this.data.cmp;
    this.medico.fotoUrl = this.data.fotoUrl;
  }
  operar() {
    if (this.medico != null) {
      //edit
      //BUENA PRACTICA
      this.medicoService.modificar(this.medico).pipe(switchMap(()=>{
        return this.medicoService.listarMedico();
      })).subscribe(data =>{
        this.medicoService.medicoCambio.next(data);
        this.medicoService.mensajeCambio.next('SE MODIFICO')
      })
    } else {
      //Add New
      this.medicoService.registrar(this.medico).subscribe(() => {
        this.medicoService.listarMedico().subscribe(data => {
          this.medicoService.medicoCambio.next(data);
          this.medicoService.mensajeCambio.next('SE REGISTRO');
        })
      });
      
    }

    this.dialogRef.close();
  }
  cancelar() {
    this.dialogRef.close();
  }
}
