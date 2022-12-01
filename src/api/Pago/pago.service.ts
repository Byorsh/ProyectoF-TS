import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from 'src/Entities/pago.entity';
import { Consumo } from 'src/Entities/consumo.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PagoService{
    constructor(
        @InjectRepository(Pago) private pagoRepos : Repository<Pago>,
        @InjectRepository(Consumo) private consumoRepos : Repository<Consumo>
    ){}

    async agregarPago(data : any){
        const direccionIdConsumo = data.id_consumo;
        const consumo = await this.consumoRepos.findOne({
            where:{
                id:direccionIdConsumo
            }
        });
        if(!consumo){
            throw new NotFoundException('No se encontro el consumo');
        }
        const nuevoPago = new Pago();
        nuevoPago.consumo = consumo;
        nuevoPago.pagado = data.pagado;
        nuevoPago.monto = data.monto;
        return this.pagoRepos.save(nuevoPago);
    }
}