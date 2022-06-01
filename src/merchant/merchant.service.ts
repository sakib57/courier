import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MerchantUpdateDto } from './merchant-update.dto';
import { IMerchant } from './merchant.interface';
import { MerchantRepository } from './merchant.repository';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/common/util';
import { ChangePasswordDto } from 'src/common/change-password.dto';
import { SearchQueryDto } from 'src/common/search-query.dto';
import { BranchRepository } from 'src/branch/branch.repository';
import { MerchantWallet } from 'src/entities/merchant-wallet.entity';
import { IMerchantWallet } from './merchant-wallet.interface';

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(MerchantRepository)
    private merchantRepository: MerchantRepository,
    @InjectRepository(BranchRepository)
    private branchRepository: BranchRepository,
  ) {}

  // Merchants profile
  async merchantProfile(id: number): Promise<IMerchant> {
    const merchant = await this.merchantRepository.findOne(id);
    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }
    return merchant;
  }

  // Merchants wallet
  async merchantWallet(id: number): Promise<IMerchantWallet[]> {
    const merchant = await this.merchantRepository.findOne(id);
    const wallet = await MerchantWallet.find({
      where: { merchant: merchant },
      relations: ['parcel', 'merchant'],
    });
    return wallet;
  }

  // Merchants profile update
  async merchantProfileUpdate(
    id: number,
    merchantUpdateDto: MerchantUpdateDto,
  ): Promise<IMerchant> {
    const merchant = await this.merchantRepository.findOne(id);
    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }
    merchant.name = merchantUpdateDto.name;
    merchant.name = merchantUpdateDto.name;
    merchant.address = merchantUpdateDto.address;
    merchant.contact_number = merchantUpdateDto.contact_number;
    merchant.in_city_rate = merchantUpdateDto.in_city_rate;
    merchant.out_city_rate = merchantUpdateDto.out_city_rate;

    try {
      merchant.save();
    } catch (err) {
      throw new HttpException('Something wrong', 500);
    }
    return merchant;
  }

  // Merchant List
  async merchantList(searchQueryDto: SearchQueryDto): Promise<IMerchant[]> {
    const branch = await this.branchRepository.findOne(
      searchQueryDto.branch_id,
    );
    let merchants = null;
    if (branch) {
      merchants = await this.merchantRepository.find({
        where: {
          branch: branch,
        },
        relations: ['branch'],
      });
    } else {
      merchants = await this.merchantRepository.find({
        relations: ['branch'],
      });
    }

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
