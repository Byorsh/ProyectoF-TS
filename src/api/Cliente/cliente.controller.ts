import { Get, Body, Controller, Post } from '@nestjs/common';
import { ICliente } from './../../Models/cliente.model';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController{
    constructor(private ClienteService: ClienteService){}

    @Post()
    Create(@Body() params: ICliente): boolean{

        try{
            this.ClienteService.create(params)
            return true
        }catch(error){
            console.log({error})
        }
    }

    @Get('/all')
    getClientes(): ICliente[]{
        return this.ClienteService.getAll()
    }
}