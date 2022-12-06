import { Consumo } from './consumo.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Pago{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    monto:number;
    
    @Column()
    pagado:boolean;

    @ManyToOne(() => Consumo, (consumo) => consumo.pago)
    @JoinColumn({ name: 'id_consumo'})
    id_Consumo: number;
}