import { IPago } from './pago.model';
export interface IConsumo{
    id:number;
    fecha:Date;
    pago: IPago[];
    
}