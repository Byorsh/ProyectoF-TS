import { Body, Controller, Post } from '@nestjs/common';
import { PagoService } from './pago.service';
import { Pago } from 'src/Entities/pago.entity';
import { ConsumoService } from '../Consumo/consumo.service';

@Controller('Pago')
export class PagoController{
    constructor(private pagoService: PagoService, private consumoService: ConsumoService){}

    @Post()
    agregarPago(@Body() body:any){
        return this.pagoService.agregarPago(body);
    }
}