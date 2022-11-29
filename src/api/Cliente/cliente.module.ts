import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClienteService } from "./cliente.service";
import { ClienteController } from "./cliente.controller";
import { Cliente } from "src/Entities/cliente.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Cliente])],
    providers: [ClienteService],
    controllers: [ClienteController],
    exports:[]
})
export class ClienteModule{}