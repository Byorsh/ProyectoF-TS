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
    edad:number;

    @Column()
    direccion:string;
}