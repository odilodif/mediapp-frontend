import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Medico } from '../../model/medico';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MedicoService } from '../../service/medico.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MedicoDialogComponent } from './medico-dialog/medico-dialog.component';
import {switchMap} from 'rxjs/operators';
@Component({
  selector: 'app-medico-component',
  templateUrl: './medico-component.component.html',
  styleUrl: './medico-component.component.css'
})
export class MedicoComponentComponent implements OnInit {
  dataSource: MatTableDataSource<Medico>;
  displayedColumns: string[] = ['idMedico', 'nombres', 'apellidos', 'cmp', 'fotoUrl', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private medicoService: MedicoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {


    this.medicoService.medicoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

    this.medicoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000
      })
    });




    this.medicoService.listarMedico().subscribe((data) => {
      //console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    })
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirDialogo(medico?: Medico) {
    let medic = medico != null ? medico : new Medico();
    this.dialog.open(MedicoDialogComponent, {
      width: '300px',
      data: medic
    })
  }

  eliminar(medico: Medico) {
    this.medicoService.eliminar(medico.idMedico).pipe(switchMap(()=>{
      return this.medicoService.listarMedico();
    })).subscribe((data)=>{
      this.medicoService.medicoCambio.next(data);
      this.medicoService.mensajeCambio.next('SE ELIMINO ')
    });
  }


}
