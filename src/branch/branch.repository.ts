import { BranchDto } from './branch.dto';
import { Branch } from 'src/entities/branch.entity';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/common/util';
import { SignInDto } from 'src/auth/dto';
import { IBranch } from './branch.interface';
import { Upazila } from 'src/entities/upazila.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Branch)
export class BranchRepository extends Repository<Branch> {
  // Create Branch
  async createBranch(branchDto: BranchDto): Promise<IBranch> {
    const { name, user_email, user_password, phone, address, upazila_id } =
      branchDto;
    const upazila = await Upazila.findOne({ id: upazila_id });

    if (!upazila) {
      throw new NotFoundException('Upazila not found');
    }
    const branch = new Branch();
    branch.name = name;
    branch.user_email = user_email;
    branch.user_password = user_password;
    branch.salt = await bcrypt.genSalt();
    branch.user_password = await hashPassword(user_password, branch.salt);
    branch.phone = phone;
    branch.address = address;
    branch.upazila = upazila;
    try {
      await branch.save();
    } catch (err) {
      console.log(err);
    }

    const response: any = {
      name: branch.name,
      phone: branch.phone,
      address: branch.address,
      upazila: branch.upazila,
    };

    return response;
  }

  // Branch List
  async branchList(upazila): Promise<Branch[]> {
    if (upazila) {
      return await this.find({ upazila: upazila });
    }
    return await this.find();
  }

  // Validate password
  async validateBranchPassword(signInDto: SignInDto): Promise<BranchDto> {
    const { email, password } = signInDto;
    const branch = await this.findOne(
      {
        user_email: email,
      },
      { relations: ['upazila'] },
    );
    if (branch && (await branch.validateBranchPassword(password))) {
      const branchData: BranchDto = {
        id: branch.id,
        name: branch.name,
        user_email: branch.user_email,
        user_password: branch.user_password,
        salt: branch.salt,
        phone: branch.phone,
        address: branch.address,
        upazila_id: branch.upazila.id,
      };
      return branchData;
    } else {
      return null;
    }
  }
}
