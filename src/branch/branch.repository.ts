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
  // Branch List
  // Validate password
}
