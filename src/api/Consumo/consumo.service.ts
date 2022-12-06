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

    async create(consumo:IConsumo): Promise<string | boolean>{
        const date = new Date;
        let total = 0;
        let pago = consumo.pagado;
        let edad = this.getEdad(new Date(await this.clienteService.getByID(consumo.id_cliente)))
        if(edad > 500){return false}
        

        if (consumo.consumo > 1 && consumo.consumo < 101) {
            total = consumo.consumo * 150;
        }else if (consumo.consumo > 101 && consumo.consumo < 301) {
            total = consumo.consumo * 170;
        } else {
            total = consumo.consumo * 190;
        }

        if (edad > 50 ){
            total = total - (total * .10)
        }
        const response = await this.consumoEntity.save({
            fecha: date ,
            consumo: consumo.consumo,
            id_Cliente : consumo.id_cliente
        })
        

        await this.pagoService.create(response.id, total, pago)
        return true
        
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

    getEdad(date: Date) {
        let hoy = new Date()
        let fechaNacimiento = new Date(date)
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
        let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
        if (
          diferenciaMeses < 0 ||
          (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
        ) {
          edad--
        }
        return edad
    }

    
}