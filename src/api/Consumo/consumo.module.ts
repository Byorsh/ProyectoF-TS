import { Pago } from './../../Entities/pago.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumo } from 'src/Entities/consumo.entity';

import { ConsumoController } from './consumo.controller';
import { ConsumoService } from './consumo.service';
import { PagoService } from '../Pago/pago.service';


@Module({
    imports: [TypeOrmModule.forFeature([Consumo, Pago])],
    providers: [ConsumoService, PagoService],
    controllers: [ConsumoController],
    exports: [TypeOrmModule]
})
export class ConsumoModule{}
