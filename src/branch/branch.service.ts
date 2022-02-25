import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignDto } from 'src/common/assign.dto';
import { Branch } from 'src/entities/branch.entity';
import { PickupParcelRepository } from 'src/repositories/pickup-parcel.repository';
import { BranchDto } from './branch.dto';
import { BranchRepository } from './branch.repository';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(BranchRepository)
    private branchRepository: BranchRepository,
    @InjectRepository(PickupParcelRepository)
    private pickupParcelRepository: PickupParcelRepository,
  ) {}

  // Create Branch
  async createBranch(branchDto: BranchDto): Promise<Branch> {
    return this.branchRepository.createBranch(branchDto);
  }
  // Branch List
  async branchList(): Promise<BranchDto[]> {
    return this.branchRepository.branchList();
  }

  // Assign Pickup
  async assignPickup(assignDto: AssignDto): Promise<void> {
    return this.pickupParcelRepository.assignForPickup(assignDto);
  }
}
