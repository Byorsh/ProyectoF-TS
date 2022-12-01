import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumo } from 'src/Entities/consumo.entity';
import { Cliente } from 'src/Entities/cliente.entity';

import { ConsumoController } from './consumo.controller';
import { ConsumoService } from './consumo.service';
import { ClienteController } from '../Cliente/cliente.controller';
import { ClienteService } from '../Cliente/cliente.service';


@Module({
    imports: [TypeOrmModule.forFeature([Consumo, Cliente])],
    providers: [ConsumoService, ClienteService],
    controllers: [ConsumoController, ClienteController],
    exports: [TypeOrmModule]
})
export class ConsumoModule{}
