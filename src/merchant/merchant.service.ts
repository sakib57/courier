import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Merchant } from 'src/entities/merchant.entity';
import { MerchantRepository } from './merchant.repository';

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(MerchantRepository)
    private merchantRepository: MerchantRepository,
  ) {}

  // Merchant List
  async merchantList(): Promise<Merchant[]> {
    return this.merchantRepository.find();
  }
}
