import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rider } from 'src/entities/rider.entity';
import { RiderRepository } from './rider.repository';

@Injectable()
export class RiderService {
  constructor(
    @InjectRepository(RiderRepository)
    private riderRepository: RiderRepository,
  ) {}
  // Rider List
  async riderList(): Promise<Rider[]> {
    return this.riderRepository.find();
  }
}
