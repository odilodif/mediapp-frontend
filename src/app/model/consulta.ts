import { DetalleConsulta } from "./detalleConsulta";
import { Especialidad } from "./especialidad";
import { Medico } from "./medico";
import { Paciente } from "./paciente";

export class Consulta{
    idConsulta:number;
    paciente: Paciente;
    medico:Medico;
    especialidad:Especialidad;
    fecha:string;
    num_consultorio:string;
    detalleConsulta:DetalleConsulta[];

}