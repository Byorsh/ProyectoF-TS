import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from "src/Entities/cliente.entity";
import { Consumo } from "src/Entities/consumo.entity";
import { Pago } from "src/Entities/pago.entity";

export const Conection = TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port: 3306,
    username:'root',
    password:'',
    database:'consumoBD',
    entities:[Cliente, Consumo, Pago],
    synchronize: true
})