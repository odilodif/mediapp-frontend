import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../model/paciente';
import { Medico } from '../../model/medico';
import { Especialidad } from '../../model/especialidad';
import { Examen } from '../../model/examen';
import { DetalleConsulta } from '../../model/detalleConsulta';
import { PacienteServiceService } from '../../service/paciente-service.service';
import { EspecialidadService } from '../../service/especialidad.service';
import { MedicoService } from '../../service/medico.service';
import { ExamenService } from '../../service/examen.service';
import { ConsultaService } from '../../service/consulta.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent implements OnInit {

  pacientes: Paciente[];
  medicos: Medico[];
  especialidades: Especialidad[];
  examenes: Examen[];
  maxfecha: Date = new Date();
  fechaSeleccionada: Date = new Date();

  diagnostico: string;
  tratamiento: string;
  mensaje: string;

  detalleConsulta: DetalleConsulta[] = [];
  examenesSelecciondos: Examen[] = [];


  idPacienteSeleccionado: number;
  idEspecialidadSeleccionada: number;
  idMedicoSeleccionado: number;
  idExamenSeleccionado: number;

  /*constructor*/
  constructor(
    private pacienteService: PacienteServiceService,
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private examenService: ExamenService,
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.listarPaciente();
    this.listarEspecialidad();
    this.listarMedico();
    this.listarExamen();
  }

  agregar() {
    if (this.diagnostico != null && this.tratamiento != null) {
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);
      this.diagnostico = '';
      this.tratamiento = '';
    }

  }


  removerDiagnostico(i: number) {
    this.detalleConsulta.splice(i, 1); /// el 1 es cuantos elementos quiero eliminar desde el valor i
  }

  removerExamen(){
    
  }

  agregarExamen(){
    if (this.idExamenSeleccionado>0) {
      let examen = new Examen();
      examen.idExamen = this.idExamenSeleccionado;
      
      this.examenService.listarPorId(this.idExamenSeleccionado).subscribe(data =>{
        examen.nombre = data.nombre;
        examen.descripcion = data.descripcion;
        this.examenesSelecciondos.push(examen);
      });


    }
  }

  listarPaciente() {
    this.pacienteService.listarPacientes().subscribe(data => {
      this.pacientes = data;
    })
  }
  listarEspecialidad() {
    this.especialidadService.listarEspecialidad().subscribe(data => {
      this.especialidades = data;
    });
  }
  listarMedico() {
    this.medicoService.listarMedico().subscribe(data => {
      this.medicos = data;
    });
  }
  listarExamen() {
    this.examenService.listarExamen().subscribe(data => {
      this.examenes = data;
    });
  }




}
