import { Controller, Get } from '@nestjs/common';
import { PagoService } from './pago.service';
import { Pago } from 'src/Entities/pago.entity';
import { ConsumoService } from '../Consumo/consumo.service';

@Controller('Pago')
export class PagoController{
    constructor(private pagoService: PagoService){}

    @Get('/all')
    getClient(){
        return this.pagoService.getAll()
    }

    @Get('/pagado')
    getClientPagado(){
        return this.pagoService.getPagado()
    }

    @Get('/noPagado')
    getClientNoPagado(){
        return this.pagoService.getNoPagado()
    }
}