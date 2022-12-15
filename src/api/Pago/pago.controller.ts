import { ConsumoService } from './../Consumo/consumo.service';
import { PagoService } from './pago.service';

import { IPago } from 'src/Models/pago.model';
import { Controller, Body, Post } from '@nestjs/common';

@Controller('pago')
export class PagoController{
    constructor(private pagoService: PagoService, private consumoService: ConsumoService){}

    @Post()
    Create(@Body() params: IPago){
        return this.pagoService.hacerPago(params.id, params.monto);
    }
}