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
  // Validate password
}
