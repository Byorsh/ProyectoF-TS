import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Consumo } from "src/Entities/consumo.entity";
import { Pago } from "src/Entities/pago.entity";

import { PagoController } from "./pago.controller";
import { PagoService } from "./pago.service";

@Module({
    imports: [TypeOrmModule.forFeature([Pago, Consumo])],
    providers: [PagoService],
    controllers: [PagoController],
    exports: [TypeOrmModule]
})
export class PagoModule{}