import { Body, Controller, Post } from '@nestjs/common';
import { IConsumo } from './../../Models/consumo.model';
import { Consumo } from 'src/Entities/consumo.entity';
import { ConsumoService } from './consumo.service';

@Controller('consumo')
export class ConsumoController{
    constructor(private consumoService: ConsumoService){}

    @Post()
    Create(@Body() params:Consumo): string | boolean{
        this.consumoService.create(params);
        return true;
    }

    @Post('/consumocliente')
    agregarConsumo(@Body() body:any){
        return this.consumoService.agregarConsumo(body);
    }
}