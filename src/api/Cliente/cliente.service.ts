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
    
    private readonly Clientes: ICliente[] = [];

    async create(cliente: ICliente){
        return await this.clienteEntity.insert(cliente);
    }

    getAll(): ICliente[]{
        return this.Clientes;
    }

    findAll(){
        return this.clienteEntity.find({relations:['consumo']});
    }
}