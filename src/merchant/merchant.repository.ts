import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MerchantSignUpDto } from 'src/auth/dto/merchant-sign-up.dto';
import { Merchant } from 'src/entities/merchant.entity';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SignInDto } from 'src/auth/dto/sign-in.dto';
import { MerchantDto } from './merchant.dto';
import { Branch } from 'src/entities/branch.entity';
import { hashPassword } from 'src/common/util';

@EntityRepository(Merchant)
export class MerchantRepository extends Repository<Merchant> {
  // Merchant signUp
  async signUp(merchantSignUpDto: MerchantSignUpDto) {
    const {
      name,
      email,
      password,
      company_name,
      address,
      contact_number,
      branch_id,
    } = merchantSignUpDto;

    const branch = await Branch.findOne(branch_id);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    const merchant = new Merchant();
    merchant.name = name;
    merchant.email = email;
    merchant.salt = await bcrypt.genSalt();
    merchant.password = await hashPassword(password, merchant.salt);
    merchant.company_name = company_name;
    merchant.address = address;
    merchant.contact_number = contact_number;
    merchant.branch = branch;

    try {
      await merchant.save();
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exist!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // Validate password
  async validateMerchantPassword(signInDto: SignInDto): Promise<MerchantDto> {
    const { email, password } = signInDto;
    const merchant = await this.findOne({ email });
    if (merchant && (await merchant.validateMerchantPassword(password))) {
      const merchantData: MerchantDto = {
        name: merchant.name,
        email: merchant.email,
        company_name: merchant.company_name,
        address: merchant.address,
        contact_number: merchant.contact_number,
      };
      return merchantData;
    } else {
      return null;
    }
  }
}
