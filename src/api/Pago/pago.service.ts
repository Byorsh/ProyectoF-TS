import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from 'src/Entities/pago.entity';
import { IPago } from 'src/Models/pago.model';
import { Repository } from 'typeorm';

@Injectable()
export class PagoService{
    constructor(
        @InjectRepository(Pago) private pagoEntity : Repository<Pago>
    ){}

    
}