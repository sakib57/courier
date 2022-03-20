import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignDto } from 'src/common/assign.dto';
import { Branch } from 'src/entities/branch.entity';
import { DeliveryParcelRepository } from 'src/repositories/delivery-parcel.repository';
import { PickupParcelRepository } from 'src/repositories/pickup-parcel.repository';
import { BranchDto } from './branch.dto';
import { IBranch } from './branch.interface';
import { BranchRepository } from './branch.repository';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(BranchRepository)
    private branchRepository: BranchRepository,
    @InjectRepository(PickupParcelRepository)
    private pickupParcelRepository: PickupParcelRepository,
    @InjectRepository(DeliveryParcelRepository)
    private deliveryParcelRepository: DeliveryParcelRepository,
  ) {}

  // Create Branch
  async createBranch(branchDto: BranchDto): Promise<IBranch> {
    return this.branchRepository.createBranch(branchDto);
  }

  // Branch List
  async branchList(upazila): Promise<Branch[]> {
    return this.branchRepository.branchList(upazila);
  }

  // Assign For Pickup
  async assignPickup(assignDto: AssignDto): Promise<void> {
    return this.pickupParcelRepository.assignForPickup(assignDto);
  }

  // Assign For Delivery
  async assignDelivery(assignDto: AssignDto): Promise<void> {
    return this.deliveryParcelRepository.assignForDelivery(assignDto);
  }
}
