import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Pago{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    monto:number;
    
    @Column()
    pagado:boolean;
}