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
import { ChangePasswordDto } from 'src/common/change-password.dto';
import { Parcel, PickupStatus } from 'src/entities/parcel.entity';
import { Rider } from 'src/entities/rider.entity';
import { PickupParcel } from 'src/entities/pickup-parcel.entity';
import { Merchant } from 'src/entities/merchant.entity';
import { MerchantWallet } from 'src/entities/merchant-wallet.entity';

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
    const { parcel_id, rider_id } = assignDto;
    const parcel = await Parcel.findOne(parcel_id);
    const rider = await Rider.findOne(rider_id);

    if (!parcel) {
      throw new NotFoundException('Parcel not found');
    }
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }
    const pickupParcel = new PickupParcel();
    pickupParcel.parcel = parcel;
    pickupParcel.rider = rider;
    const merchant = await Merchant.findOne(parcel.merchant);
    const merchantWallet = new MerchantWallet();
    merchantWallet.parcel = parcel;
    merchantWallet.merchant = merchant;
    if (assignDto.is_inside_city) {
      merchantWallet.amount = merchant.in_city_rate;
    } else {
      merchantWallet.amount = merchant.out_city_rate;
    }
    try {
      await merchantWallet.save();
      await pickupParcel.save();
      parcel.pickup_status = PickupStatus.ASSIGNED;
      await parcel.save();
    } catch (error) {
      throw new HttpException(`${error.sqlMessage}`, 404);
    }
  }

  // Assign For Delivery
  async assignDelivery(assignDto: AssignDto): Promise<void> {
    return this.deliveryParcelRepository.assignForDelivery(assignDto);
  }

  // Cgange password
  async changePassword(id, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;
    const branch = await this.branchRepository.findOne(id);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
    const isMatched = await branch.validateBranchPassword(oldPassword);
    if (isMatched) {
      branch.salt = await bcrypt.genSalt();
      branch.user_password = await hashPassword(newPassword, branch.salt);
      await branch.save();
      return branch;
    } else {
      throw new NotFoundException("Old password didn't match");
    }
  }
}
