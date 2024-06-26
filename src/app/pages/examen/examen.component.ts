import { Component, OnInit, ViewChild } from '@angular/core';
import { Examen } from '../../model/examen';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ExamenService } from '../../service/examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrl: './examen.component.css'
})
export class ExamenComponent implements OnInit {

  dataSource: MatTableDataSource<Examen>;
  displayedColumns: string[] = ['idExamen', 'descripcion', 'nombre','acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private examenService: ExamenService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {

  }
  ngOnInit(): void {
    this.examenService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000
      })
    });

    this.examenService.examenCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.examenService.listarExamen().subscribe((data) => {
      //console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(idPaciente: number) {
    this.examenService.eliminar(idPaciente).subscribe(() => {
      this.examenService.listarExamen().subscribe((data) => {
        this.examenService.examenCambio.next(data);
        this.examenService.mensajeCambio.next('SE ELIMINO!!!')
     
      });
    })
  }

}
