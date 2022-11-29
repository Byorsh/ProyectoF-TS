import { ICliente } from './../../Models/cliente.model';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/Entities/cliente.entity';

@Injectable()
export class ClienteService{
    constructor(
        @InjectRepository(Cliente) private clientEntity : Repository<Cliente>
    ){}
    
    async create(cliente: ICliente){
        return await this.clientEntity.save(cliente)
    }

    getAll(){
        return this.clientEntity.find()
    }
}