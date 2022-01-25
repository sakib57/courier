import { BranchDto } from './branch.dto';
import { Branch } from 'src/entities/branch.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Branch)
export class BranchRepository extends Repository<Branch> {
  // Create Branch
  async createBranch(branchDto: BranchDto): Promise<Branch> {
    const { name, user_email, user_password } = branchDto;
    const branch = new Branch();
    branch.name = name;
    branch.user_email = user_email;
    branch.user_password = user_password;
    await branch.save();
    return branch;
  }

  // Branch List
  async branchList(): Promise<BranchDto[]> {
    return await this.find();
  }
}
