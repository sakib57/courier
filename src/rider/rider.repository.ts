import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RiderSignUpDto } from 'src/auth/dto/rider-sign-up.dto';
import { Branch } from 'src/entities/branch.entity';
import { Rider } from 'src/entities/rider.entity';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/common/util';
import { SignInDto } from 'src/auth/dto/sign-in.dto';
import { RiderDto } from './rider.dto';

@EntityRepository(Rider)
export class RiderRepository extends Repository<Rider> {
  async signUp(riderSignUpDto: RiderSignUpDto) {
    console.log('inside rider repo');
    const { name, email, password, address, contact_number, branch_id } =
      riderSignUpDto;

    const branch = await Branch.findOne(branch_id);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }

    const rider = new Rider();
    rider.name = name;
    rider.email = email;
    rider.salt = await bcrypt.genSalt();
    rider.password = await hashPassword(password, rider.salt);
    rider.address = address;
    rider.contact_number = contact_number;
    rider.branch = branch;
    rider.isActive = true;
    try {
      await rider.save();
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
  async validateRiderPassword(signInDto: SignInDto): Promise<RiderDto> {
    const { email, password } = signInDto;
    const rider = await this.findOne({ email });
    if (rider && (await rider.validateRiderPassword(password))) {
      const riderData: RiderDto = {
        name: rider.name,
        email: rider.email,
        address: rider.address,
        contact_number: rider.contact_number,
        isActive: rider.isActive,
      };
      return riderData;
    } else {
      return null;
    }
  }
}
