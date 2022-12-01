import { IConsumo } from './../../Models/consumo.model';
import { Consumo } from 'src/Entities/consumo.entity';
import { Pago } from 'src/Entities/pago.entity';
import { Cliente } from 'src/Entities/cliente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class ConsumoService{
    constructor(
        @InjectRepository(Consumo) private consumoEntity:Repository<Consumo>,
        @InjectRepository(Cliente) private clienteEntity:Repository<Cliente>,
        @InjectRepository(Consumo) private consumoRepos:Repository<Consumo>
    ){}

    async create (consumo:Consumo){
        return await this.consumoEntity.insert(consumo);
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
        nuevoConsumo.cliente = cliente;
        nuevoConsumo.fecha = data.fecha;
        nuevoConsumo.consumo = data.total;
        return this.consumoRepos.save(nuevoConsumo);
    }
}