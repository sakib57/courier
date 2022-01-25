import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from 'src/entities/branch.entity';
import { BranchDto } from './branch.dto';
import { BranchRepository } from './branch.repository';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(BranchRepository)
    private branchRepository: BranchRepository,
  ) {}

  // Create Branch
  async createBranch(branchDto: BranchDto): Promise<Branch> {
    return this.branchRepository.createBranch(branchDto);
  }
  // Branch List
  async branchList(): Promise<BranchDto[]> {
    return this.branchRepository.branchList();
  }
}
