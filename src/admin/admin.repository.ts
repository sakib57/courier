import { AdminSignUpDto, SignInDto } from 'src/auth/dto';
import { Admin } from 'src/entities/admin.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AdminDto } from './admin.dto';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/common/util';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  // Merchant signUp
  // Sign In Method
}
