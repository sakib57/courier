import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMerchant } from './merchant.interface';
import { MerchantRepository } from './merchant.repository';

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(MerchantRepository)
    private merchantRepository: MerchantRepository,
  ) {}

  // Merchant List
  async merchantList(): Promise<IMerchant[]> {
    const merchants = await this.merchantRepository.find({
      relations: ['branch'],
    });
    const newMerchants = [];
    merchants.map((value) => {
      const response: IMerchant = {
        id: value.id,
        name: value.name,
        email: value.email,
        company_name: value.company_name,
        address: value.address,
        contact_number: value.contact_number,
        branch: value.branch,
      };
      newMerchants.push(response);
    });
    return newMerchants;
  }
}
