import { Body, Controller, Post, Get } from '@nestjs/common';
import { IConsumo } from './../../Models/consumo.model';
import { Consumo } from 'src/Entities/consumo.entity';
import { ConsumoService } from './consumo.service';

@Controller('consumo')
export class ConsumoController{
    constructor(private consumoService: ConsumoService){}

    @Post()
    Create(@Body() params: IConsumo){
        try{
            this.consumoService.create(params);
        } catch(error){
            console.log(`Error: ${error}`);
        }
    }

    @Get()
    getConsumos(){
        try{
            this.consumoService.getAll();
        }catch (error){
            console.log(`Error: ${error}`);
        }
    }

}