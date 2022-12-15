import { ICliente } from './../../Models/cliente.model';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente as ClienteEntity} from 'src/Entities/cliente.entity';

@Injectable()
export class ClienteService{
    constructor(
        @InjectRepository(ClienteEntity) 
        private clienteEntity : Repository<ClienteEntity>
    ){}

    async create(cliente: ICliente){
        return await this.clienteEntity.save(cliente);
    }

    findAll(){
        return this.clienteEntity.find({relations:['consumo']});
    }

    async getPagado(){
        let clientes = await this.clienteEntity.find({
            where:{
                consumo:{
                    pago: {
                        pagado: true
                    }
                }
            }
        })
        return clientes;
    }

    async getPagoPendiente(){
        let clientes = await this.clienteEntity.find({
            where:{
                consumo:{
                    pago:{
                        pagado: false
                    }
                }
            }
        })
        return clientes;
    }
}