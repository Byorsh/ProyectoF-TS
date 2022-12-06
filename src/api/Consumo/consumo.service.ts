import { IConsumo } from './../../Models/consumo.model';
import { Consumo } from 'src/Entities/consumo.entity';
import { Pago } from 'src/Entities/pago.entity';
import { Cliente } from 'src/Entities/cliente.entity';
import { PagoService } from '../Pago/pago.service';
import { ClienteService } from '../Cliente/cliente.service';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Get, NotFoundException} from '@nestjs/common';

@Injectable()
export class ConsumoService{
    constructor(
        @InjectRepository(Consumo) private consumoEntity:Repository<Consumo>,
        @InjectRepository(Cliente) private clienteEntity:Repository<Cliente>,
        @InjectRepository(Consumo) private consumoRepos:Repository<Consumo>,
        private pagoService : PagoService,
        private clienteService : ClienteService
    ){}

    async create (consumo:Consumo){
        let total = 0;
        let pago = consumo.pago;
        
    }

    getAll(){
        return this.consumoEntity.find()
    }

    getMaxConsumo(){
        return this.consumoEntity.find({
            take:1,
            order: {
                consumo: 'DESC'
            }
        })
    }

    getMinConsumo(){
        return this.consumoEntity.find({
            take:1,
            order: {
                consumo: 'ASC'
            }
        })
    }

    async agregarConsumo(data:any){
        const direccionIdCliente = data.id_consumo;
        const cliente = await this.clienteEntity.findOne({
            where:{
                id:direccionIdCliente
            },
        });
        if(!cliente){
            throw new NotFoundException('No existe el cliente');
        }

        const nuevoConsumo = new Consumo();
        nuevoConsumo.id_cliente = cliente;
        nuevoConsumo.fecha = data.fecha;
        nuevoConsumo.consumo = data.total;
        return this.consumoRepos.save(nuevoConsumo);
    }
}