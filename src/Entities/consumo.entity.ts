import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Cliente } from "./cliente.entity";
import { Pago } from "./pago.entity";

@Entity()
export class Consumo{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fecha:Date;

    @Column()
    consumo:number;

    @ManyToOne(()=> Cliente, (cliente)=>cliente.consumo)
    @JoinColumn({ name: 'id_cliente'})
    id_cliente: number;

    @OneToMany(()=> Pago, (pago) => pago.id_Consumo)
    pago: Pago[];
}