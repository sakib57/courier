import { BranchDto } from './branch.dto';
import { Branch } from 'src/entities/branch.entity';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/common/util';
import { SignInDto } from 'src/auth/dto';

@EntityRepository(Branch)
export class BranchRepository extends Repository<Branch> {
  // Create Branch
  async createBranch(branchDto: BranchDto): Promise<Branch> {
    const { name, user_email, user_password } = branchDto;
    const branch = new Branch();
    branch.name = name;
    branch.user_email = user_email;
    branch.user_password = user_password;
    branch.salt = await bcrypt.genSalt();
    branch.user_password = await hashPassword(user_password, branch.salt);
    try {
      await branch.save();
    } catch (err) {
      console.log(err);
    }

    return branch;
  }

  // Branch List
  async branchList(): Promise<BranchDto[]> {
    return await this.find();
  }

  // Validate password
  async validateBranchPassword(signInDto: SignInDto): Promise<BranchDto> {
    const { email, password } = signInDto;
    const branch = await this.findOne({ user_email: email });
    if (branch && (await branch.validateRiderPassword(password))) {
      const branchData: BranchDto = {
        id: branch.id,
        name: branch.name,
        user_email: branch.user_email,
        user_password: branch.user_password,
        salt: branch.salt,
      };
      return branchData;
    } else {
      return null;
    }
  }
}
