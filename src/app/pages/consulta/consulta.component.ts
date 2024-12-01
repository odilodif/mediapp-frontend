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
import { Consulta } from '../../model/consulta';
import { ConsultaListaExamenDTO } from '../../dto/consultaListaExamenTDO';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent implements OnInit {

  pacientes: Paciente[];//Definicion de lista de Pacientes
  medicos: Medico[];//Definicion de lista de Medicos
  especialidades: Especialidad[];//Definicion de lista de Especialidades
  examenes: Examen[];//Definicion de lista de Examenes

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

  removerExamen(index: number) {
    this.examenesSelecciondos.splice(index, 1);
  }

  estadoBotonRegistrar() {
    return (this.detalleConsulta.length === 0 || this.idEspecialidadSeleccionada === 0 || this.idMedicoSeleccionado === 0 || this.idPacienteSeleccionado === 0)
  }

  aceptar() {
    let medico = new Medico();
    medico.idMedico = this.idMedicoSeleccionado;
    let especialidad = new Especialidad();
    especialidad.idEspecialidad=this.idEspecialidadSeleccionada
    let paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSeleccionado;

    let consulta = new Consulta();
    consulta.especialidad = especialidad;
    consulta.medico = medico;
    consulta.paciente = paciente;
    consulta.num_consultorio = "1";
    //Format ISODATE
    let tzoffset = (this.fechaSeleccionada).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    //console.log(localISOTime); //yyyy-mm-ddTHH:mm:ss
    consulta.fecha = localISOTime;
    consulta.detalleConsulta = this.detalleConsulta;

    let consultaListaExamenDTO = new ConsultaListaExamenDTO;
    consultaListaExamenDTO.consulta = consulta;
    consultaListaExamenDTO.lstExamen = this.examenesSelecciondos;
    
   this.consultaService.registrar(consultaListaExamenDTO).subscribe(() => {
      this.snackBar.open("Regristrod de Consulta Exitoso", "Aviso", { duration: 500 });
      console.log(`Regristro de Consulta Exitoso `)
      console.log(consultaListaExamenDTO);
      setTimeout(() => {
        this.limpiarControles();
      }, 2000);
    });
  }

  limpiarControles() {
    this.detalleConsulta = [];
    this.examenesSelecciondos = [];
    this.diagnostico = '';
    this.tratamiento = '';
    this.idPacienteSeleccionado = 0;
    this.idEspecialidadSeleccionada = 0;
    this.idMedicoSeleccionado = 0;
    this.idExamenSeleccionado = 0;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.mensaje = '';
  }


  agregarExamen() {
    if (this.idExamenSeleccionado > 0) {


      let cont = 0;
      for (let i = 0; i < this.examenesSelecciondos.length; i++) {
        let examen = this.examenesSelecciondos[i];
        if (examen.idExamen === this.idExamenSeleccionado) {
          cont++;
          break;
        }
      }


      if (cont > 0) {
        this.mensaje = 'El examen ya se encuentra en la lista';
        this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 })
      } else {

        let examen = new Examen();
        examen.idExamen = this.idExamenSeleccionado;
        this.examenService.listarPorId(this.idExamenSeleccionado).subscribe(data => {
          examen.nombre = data.nombre;
          examen.descripcion = data.descripcion;
          this.examenesSelecciondos.push(examen);
        });

      }
    }
    else {
      this.mensaje = 'Debe agregar un examen';
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 })
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
