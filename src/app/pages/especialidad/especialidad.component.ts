import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Especialidad } from '../../model/especialidad';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EspecialidadService } from '../../service/especialidad.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';


@Component({
    selector: 'app-especialidad',
    templateUrl: './especialidad.component.html',
    styleUrl: './especialidad.component.css',
    standalone: false
})
export class EspecialidadComponent implements OnInit {

  dataSource: MatTableDataSource<Especialidad>;
  displayedColumns: string[] = ['idEspecialidad', 'nombre', 'acciones'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor
    (
      private especialidadService: EspecialidadService,
      private snackBar: MatSnackBar,
      public route: ActivatedRoute
    ) {

  }


  ngOnInit(): void {
    this.especialidadService.especialidadCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.especialidadService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000
      })
    });

    this.especialidadService.listarEspecialidad().subscribe((data) => {
      //console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    });


    /*let array= [];
    for (let i = 0; i < 3; i++) {
     let obs = this.especialidadService.listarEspecialidad();
      array.push(obs)
    }

    forkJoin(array).subscribe(data=>{
      console.log(data);
    })*/

    /*  let obs1 = this.especialidadService.listarEspecialidad();
      let obs2 = this.especialidadService.listarEspecialidad();
      let obs3 = this.especialidadService.listarEspecialidad(); 
     
      forkJoin(obs1,obs2,obs3).subscribe(data=>{
       console.log(data)
      })*/



  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(idEspecialidad: number) {
    this.especialidadService.eliminar(idEspecialidad).subscribe(() => {
      this.especialidadService.listarEspecialidad().subscribe((data) => {
        this.especialidadService.especialidadCambio.next(data);
        this.especialidadService.mensajeCambio.next('SE ELIMINO!!!')

      });
    })
  }
}
