import { IConsumo } from './consumo.model';
import { IPago } from './pago.model';

export interface ICliente{
    id_Cliente:number;
    nombre: string;
    correo: string;
    telefono: string;
    direccion: string;
    fecha_nacimiento: Date;
    consumo: IConsumo[];
}