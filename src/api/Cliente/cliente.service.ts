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
        return await this.clienteEntity.save(cliente);
    }

    getAll(): ICliente[]{
        return this.Clientes;
    }

    findAll(){
        return this.clienteEntity.find({relations:['consumo']});
    }

    async getByID(id_cliente:number):Promise<string>{
        const clienteExiste = await this.clienteEntity.findOne({where:{id: id_cliente}})
        if(!clienteExiste){
            console.error(`No he encontrado el producto con id ${id_cliente}`)
            return "1500-1-1"
           // throw new NotFoundException(`No he encontrado el producto con id ${id_cliente}`);
        }
        return (await this.clienteEntity.findOne({where:{id: id_cliente}})).fecha_nac
    }
}