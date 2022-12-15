import { Injectable, BadRequestException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from 'src/Entities/pago.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PagoService{
    constructor(
        @InjectRepository(Pago) private pagoEntity : Repository<Pago>
    ){}

    async create(idConsumo: number, total: number){
        
        const consumo = await this.pagoEntity.save({
            id:null,
            total: total,
            id_Consumo: idConsumo,
            pagado: false
        });
    }

    async hacerPago(idConsumo: number, mont: number){     
        if(idConsumo){
            const pagoPendiente = await this.pagoEntity.findOne({
                where:{ id: idConsumo },
            });
            if(pagoPendiente){
                if(pagoPendiente.pagado){
                    throw new BadRequestException('Id no valida', { cause: new Error(), description: 'Este id ya fue pagado' })
                }
                else{
                    if(mont>0){//Pago completo
                        if(mont >=pagoPendiente.monto){
                            await this.pagoEntity.save({
                                id: pagoPendiente.id,
                                id_consumo: pagoPendiente.id_Consumo,
                                total: 0,
                                pagado: true
                                
                            })
                        }
                        else{//Abono
                            await this.pagoEntity.save({
                                id: pagoPendiente.id,
                                id_consumo: pagoPendiente.id_Consumo,
                                total:pagoPendiente.monto- mont,
                                pagado: false
                                
                            })
                        }
                    }else{
                        //pago no valido
                        throw new PreconditionFailedException('Abono no valido', { cause: new Error(), description: 'El abono es menor a 0 o no fue ingresado' })
                    }
                }
                
                
            }else{//noencontro
                throw new BadRequestException('Id de pago no valida', { cause: new Error(), description: 'El id ingresado no existe en la base de datos' })
            }
        }
        else{
            throw new BadRequestException('Ingresa un Id', { cause: new Error(), description: 'Debes ingresar un id para buscar el pago' })
        }
    }
}