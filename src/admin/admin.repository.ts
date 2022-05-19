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
  async signUp(adminSignUpDto: AdminSignUpDto) {
    const { name, email, password } = adminSignUpDto;

    const admin = new Admin();
    admin.name = name;
    admin.email = email;
    admin.salt = await bcrypt.genSalt();
    admin.password = await hashPassword(password, admin.salt);

    try {
      await admin.save();
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exist!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // Sign In Method
  async signIn(signInDto: SignInDto): Promise<AdminDto> {
    const { email, password } = signInDto;
    const admin = await this.findOne({ email });
    if (admin && (await admin.validatePassword(password))) {
      const adminData: AdminDto = {
        id: admin.id,
        name: admin.name,
        email: '',
        accessToken: '',
      };

      return adminData;
    } else {
      return null;
    }
  }
}
