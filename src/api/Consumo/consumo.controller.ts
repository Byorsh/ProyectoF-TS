import { Body, Controller, Post, Get } from '@nestjs/common';
import { IConsumo } from './../../Models/consumo.model';
import { Consumo } from 'src/Entities/consumo.entity';
import { ConsumoService } from './consumo.service';

@Controller('consumo')
export class ConsumoController{
    constructor(private consumoService: ConsumoService){}

    @Post()
    Create(@Body() params: IConsumo){
        this.consumoService.create(params);
    }

    @Get('/all')
    getClient(){
        return this.consumoService.getAll()
    }

    @Get('/maxConsumo')
    getMaxConsumo(){
        return this.consumoService.getMaxConsumo()
    }

    @Get('/minConsumo')
    getMinConsumo(){
        return this.consumoService.getMinConsumo()
    }
}