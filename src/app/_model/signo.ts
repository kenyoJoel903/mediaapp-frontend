import { Paciente } from "./paciente";

export class Signo {
    id: number;
    fecha: string;
    temperatura: number;
    pulso: string;
    ritmoRespitatorio: string;
    paciente: Paciente ;
}