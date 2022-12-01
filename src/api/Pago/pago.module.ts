import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Consumo } from "src/Entities/consumo.entity";
import { Pago } from "src/Entities/pago.entity";

import { ConsumoController } from "../Consumo/consumo.controller";
import { ConsumoService } from "../Consumo/consumo.service";

import { PagoController } from "./pago.controller";
import { PagoService } from "./pago.service";

@Module({
    imports: [TypeOrmModule.forFeature([Pago])],
    providers: [PagoService],
    controllers: [PagoController],
    exports: [TypeOrmModule]
})
export class PagoModule{}