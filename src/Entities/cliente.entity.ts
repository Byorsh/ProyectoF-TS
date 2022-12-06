import { Consumo } from './consumo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Cliente{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    correo:string;

    @Column()
    telefono:string;

    @Column()
    direccion:string;
    
    @Column()
    fecha_nac:string;

    @OneToMany(()=> Consumo, (consumo) => consumo.id_cliente)
    consumo: Consumo[];
}