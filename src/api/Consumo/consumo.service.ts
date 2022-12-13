import { IConsumo } from './../../Models/consumo.model';
import { Consumo } from 'src/Entities/consumo.entity';
import { Pago } from 'src/Entities/pago.entity';
import { Cliente } from 'src/Entities/cliente.entity';
import { PagoService } from '../Pago/pago.service';
import { ClienteService } from '../Cliente/cliente.service';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Get, NotFoundException} from '@nestjs/common';

@Injectable()
export class ConsumoService{
    constructor(
        @InjectRepository(Consumo) private consumoEntity:Repository<Consumo>,
        @InjectRepository(Cliente) private clienteEntity:Repository<Cliente>,
        @InjectRepository(Consumo) private consumoRepos:Repository<Consumo>,
        private pagoService : PagoService,
        private clienteService : ClienteService
    ){}

<<<<<<< HEAD
    async create(consumo:IConsumo): Promise<string | boolean>{
        const date = new Date;
        let total = 0;
        let pago = consumo.pagado;
        let edad = this.getEdad(new Date(await this.clienteService.getByID(consumo.id_cliente)))
        if(edad > 500){return false}
        

        if (consumo.consumo > 1 && consumo.consumo < 101) {
            total = consumo.consumo * 150;
        }else if (consumo.consumo > 101 && consumo.consumo < 301) {
            total = consumo.consumo * 170;
        } else {
            total = consumo.consumo * 190;
        }

        if (edad > 50 ){
            total = total - (total * .10)
        }
        const response = await this.consumoEntity.save({
            fecha: date ,
            consumo: consumo.consumo,
            id_Cliente : consumo.id_cliente
        })
        

        await this.pagoService.create(response.id, total, pago)
        return true
        
    }

=======
>>>>>>> 99bb63c (Se altero el consumo)
    getAll(){
        return this.consumoEntity.find()
    }

    getMaxConsumo(){
        return this.consumoEntity.find({
            take:1,
            order: {
                consumo: 'DESC'
            }
        })
    }

    getMinConsumo(){
        return this.consumoEntity.find({
            take:1,
            order: {
                consumo: 'ASC'
            }
        })
    }

<<<<<<< HEAD
    getEdad(date: Date) {
        let hoy = new Date()
        let fechaNacimiento = new Date(date)
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
        let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
        if (
          diferenciaMeses < 0 ||
          (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
        ) {
          edad--
        }
        return edad
=======
    async create(consumo:IConsumo): Promise<boolean>{
        const direccionIdCliente = consumo.id_cliente;
        const cliente = await this.clienteEntity.findOne({
            where:{
                id:direccionIdCliente
            },
        });
        if(!cliente){
            throw new Error('No existe el cliente');
            return false;
        }else{
            if(consumo.consumo > 0){
                const fechaCliente = cliente.fechaNac;
                const fechaAct = new Date();
                const kw = consumo.consumo;
                let edad = this.calcularEdad(fechaCliente);
                let totalPagar = this.calcularTotal(kw, edad);

                const nuevoConsumo = await this.consumoEntity.save({
                    fecha: fechaAct,
                    consumo: kw,
                    id_cliente: consumo.id_cliente
                })
                return true;
            }else{
                throw new Error("Consumo no valido");
                return false;
            }
        }
    }

    calcularEdad = (fecha) =>{
        const date = new Date();
        let cumple = new Date(fecha);
        let edad = date.getFullYear() - cumple.getFullYear();
        let mes = date.getMonth() - cumple.getMonth();

        if (mes < 0 || (mes === 0 && date.getDate() < cumple.getDate())) {
            edad--;
        }
        return edad;
    }

    calcularTotal = (kw, edad) => {
        let total = 0;
        if (kw > 0 && kw <= 100) {
            total = kw * 150;
        } else if (kw >= 101 && kw <= 300) {
            total = kw * 170;
        } else if (kw > 300) {
            total = kw * 190;
        }
        if (edad > 50) {
            let nuevoTotal = total - (total * 0.1);
            total = nuevoTotal;
        }
        return total;
>>>>>>> 99bb63c (Se altero el consumo)
    }

    
}