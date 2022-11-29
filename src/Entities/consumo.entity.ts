import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Consumo{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fecha:Date;

    @Column()
    consumo:number;
}