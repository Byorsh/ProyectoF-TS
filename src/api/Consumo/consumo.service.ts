import { IConsumo } from './../../Models/consumo.model';
import { Consumo } from 'src/Entities/consumo.entity';
import { Pago } from 'src/Entities/pago.entity';
import { Cliente } from 'src/Entities/cliente.entity';
import { PagoService } from '../Pago/pago.service';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable} from '@nestjs/common';

@Injectable()
export class ConsumoService{
    constructor(
        @InjectRepository(Consumo) private consumoEntity:Repository<Consumo>,
        @InjectRepository(Cliente) private clienteEntity:Repository<Cliente>,
        @InjectRepository(Pago) private pagoEntity:Repository<Pago>,
        private pagoService : PagoService
    ){}

    async create(consumo: IConsumo): Promise<boolean>{
        const direccionIdCliente = consumo.id_cliente;
        const cliente = await this.clienteEntity.findOne({
            where:{
                id:direccionIdCliente
            },
        });
        if(!cliente){
            throw new Error('No existe el cliente');
            return false;
        }else{
            if(consumo.consumo > 0){
                const fechaCliente = cliente.fecha_nac;
                const fechaAct = new Date();
                const kw = consumo.consumo;
                let edad = this.calcularEdad(fechaCliente);
                let totalPagar = this.calcularTotal(kw, edad);

                const nuevoConsumo = await this.consumoEntity.save({
                    fecha: fechaAct,
                    consumo: kw,
                    id_cliente: consumo.id_cliente
                })
                return true;
            }else{
                throw new Error("Consumo no valido");

                return false;
            }
        }
    }

    getAll() {
        return this.consumoEntity.find({
            relations: ['id_cliente', 'pago.id_Consumo']
        })
    }

    calcularEdad = (fecha) =>{
        const date = new Date();
        let cumple = new Date(fecha);
        let edad = date.getFullYear() - cumple.getFullYear();
        let mes = date.getMonth() - cumple.getMonth();

        if (mes < 0 || (mes === 0 && date.getDate() < cumple.getDate())) {
            edad--;
        }
        return edad;
    }

    calcularTotal = (kw, edad) => {
        let total = 0;
        
        if (kw > 0 && kw <= 100) {

            total = kw * 150;

        } else if (kw >= 101 && kw <= 300) {

            total = kw * 170;

        } else if (kw > 300) {

            total = kw * 190;

        }if (edad > 50) {

            let nuevoTotal = total - (total * 0.1);
            total = nuevoTotal;

        }

        return total;
    }

    
}