import { Consumo } from './../Entities/consumo.entity';
import { IPago } from './pago.model';
export interface IConsumo{
    id:number;
    fecha:Date;
    consumo:number;
    id_cliente:number;
    
}