import { Consulta } from "../model/consulta";
import { Examen } from "../model/examen";

export class ConsultaListaExamenDTO{
    consulta: Consulta;
    lstExamen: Examen[];
}