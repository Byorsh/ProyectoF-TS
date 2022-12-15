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

    @Get('/clientesPagado')
    getClientesPagoB(){
        try {
            return this.ClienteService.getPagado();
        } catch (error) {
            console.log(error);
            
        }
    }
    @Get('/clientesPagoPendiente')
    getClientesPagoP(){
        try {
            return this.ClienteService.getPagoPendiente();
        } catch (error) {
            console.log(error);
            
        }
    }
}