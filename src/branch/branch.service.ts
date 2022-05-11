import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignDto } from 'src/common/assign.dto';
import { Branch } from 'src/entities/branch.entity';
import { DeliveryParcelRepository } from 'src/repositories/delivery-parcel.repository';
import { PickupParcelRepository } from 'src/repositories/pickup-parcel.repository';
import { BranchUpdateDto } from './branch-update.dto';
import { BranchDto } from './branch.dto';
import { IBranch } from './branch.interface';
import { BranchRepository } from './branch.repository';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/common/util';

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

  // Branch profile
  async branchProfile(id: number): Promise<IBranch> {
    const branch = await this.branchRepository.findOne(id);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
    return branch;
  }

  // Branch profile update
  async branchProfileUpdate(
    id: number,
    branchUpdateDto: BranchUpdateDto,
  ): Promise<IBranch> {
    const branch = await this.branchRepository.findOne(id);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
    branch.name = branchUpdateDto.name;
    branch.address = branchUpdateDto.address;
    branch.user_email = branchUpdateDto.user_email;
    branch.user_password = branchUpdateDto.user_password;
    branch.salt = await bcrypt.genSalt();
    branch.user_password = await hashPassword(
      branchUpdateDto.user_password,
      branch.salt,
    );
    branch.phone = branchUpdateDto.phone;

    try {
      branch.save();
    } catch (err) {
      throw new HttpException('Something wrong', 500);
    }
    return branch;
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
