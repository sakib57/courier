import { BranchDto } from './branch.dto';
import { Branch } from 'src/entities/branch.entity';
import { Repository } from 'typeorm';

export class BranchRepository extends Repository<Branch> {
  // Create Branch
  async createBranch(branchDto: BranchDto): Promise<void> {
    const { name } = branchDto;
    const branch = new Branch();
    branch.name = name;
    await branch.save();
  }
}
