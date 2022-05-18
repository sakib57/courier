import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MerchantUpdateDto } from './merchant-update.dto';
import { IMerchant } from './merchant.interface';
import { MerchantRepository } from './merchant.repository';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/common/util';
import { ChangePasswordDto } from 'src/common/change-password.dto';

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(MerchantRepository)
    private merchantRepository: MerchantRepository,
  ) {}

  // Merchants profile
  async merchantProfile(id: number): Promise<IMerchant> {
    console.log(id);
    const merchant = await this.merchantRepository.findOne(id);
    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }
    return merchant;
  }

  // Merchants profile update
  async merchantProfileUpdate(
    id: number,
    merchantUpdateDto: MerchantUpdateDto,
  ): Promise<IMerchant> {
    const merchant = await this.merchantRepository.findOne(id);
    if (!merchant) {
      throw new NotFoundException('Rider not found');
    }
    merchant.name = merchantUpdateDto.name;
    merchant.name = merchantUpdateDto.name;
    merchant.address = merchantUpdateDto.address;
    merchant.contact_number = merchantUpdateDto.contact_number;

    try {
      merchant.save();
    } catch (err) {
      throw new HttpException('Something wrong', 500);
    }
    return merchant;
  }

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

  // Cgange password
  async changePassword(id, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;
    const merchant = await this.merchantRepository.findOne(id);
    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }
    const isMatched = await merchant.validateMerchantPassword(oldPassword);
    if (isMatched) {
      merchant.salt = await bcrypt.genSalt();
      merchant.password = await hashPassword(newPassword, merchant.salt);
      await merchant.save();
      return merchant;
    } else {
      throw new NotFoundException("Old password didn't match");
    }
  }
}
