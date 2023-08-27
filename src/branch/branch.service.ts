import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { AssignDto } from 'src/common/assign.dto';
import { Branch } from 'src/entities/branch.entity';
import { BranchUpdateDto } from './branch-update.dto';
import { BranchDto } from './branch.dto';
import { IBranch } from './branch.interface';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/common/util';
import {
  DeliveryStatus,
  Parcel,
  PickupStatus,
} from 'src/entities/parcel.entity';
import { Rider } from 'src/entities/rider.entity';
import { getRepository } from 'typeorm';
import { PickupParcel } from 'src/entities/pickup-parcel.entity';
import { Merchant } from 'src/entities/merchant.entity';
import { DeliveryParcel } from 'src/entities/delivery-parcel.entity';
import { PaymentRequest } from 'src/entities/payment-request.entity';
import { BranchOperator } from 'src/entities/branch-operator.entity';
import { District } from 'src/entities/district.entity';
import { ReturnParcel } from 'src/entities/return-parcel.entity';

@Injectable()
export class BranchService {
  // Create Branch
  async createBranch(branchDto: BranchDto): Promise<IBranch> {
    const { name, phone, user_email, password, address, district_id } =
      branchDto;
    const district = await District.findOne({ id: district_id });

    if (!district) {
      throw new NotFoundException('Upazila not found');
    }
    const branch = new Branch();
    branch.name = name;
    branch.phone = phone;
    branch.address = address;
    branch.district = district;
    try {
      const new_branch = await branch.save();
      const email = user_email;
      const branchOperator = new BranchOperator();
      branchOperator.name = 'Manager';
      branchOperator.email = email;
      branchOperator.salt = await bcrypt.genSalt();
      branchOperator.password = await hashPassword(
        password,
        branchOperator.salt,
      );
      branchOperator.branch = new_branch;
      branchOperator.isManager = true;
      await branchOperator.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(`Branch Already exist`, 401);
      }
    }

    const response: any = {
      name: branch.name,
      phone: branch.phone,
      address: branch.address,
      district: branch.district,
    };

    return response;
  }

  // Branch List
  async branchList(district): Promise<Branch[]> {
    if (district) {
      return await Branch.find({ district: district });
    }
    return await Branch.find();
  }

  // Branch profile
  async branchProfile(id: number): Promise<IBranch> {
    const branch = await Branch.findOne(id);
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
    const branch = await Branch.findOne(id);
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
    branch.name = branchUpdateDto.name;
    branch.address = branchUpdateDto.address;
    branch.phone = branchUpdateDto.phone;
    branch.image = branchUpdateDto.image;
    branch.isActive = branchUpdateDto.isActive;

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
    try {
      await pickupParcel.save();
      parcel.pickup_status = PickupStatus.ASSIGNED;
      await parcel.save();
    } catch (error) {
      throw new HttpException(`${error.sqlMessage}`, 404);
    }
  }

  // Assign For Delivery
  async assignDelivery(assignDto: AssignDto): Promise<void> {
    const { parcel_id, rider_id } = assignDto;
    const parcel = await Parcel.findOne(parcel_id);
    const rider = await Rider.findOne(rider_id);

    if (!parcel) {
      throw new NotFoundException('Parcel not found');
    }
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }
    const deliveryParcel = new DeliveryParcel();
    deliveryParcel.parcel = parcel;
    deliveryParcel.rider = rider;
    try {
      await deliveryParcel.save();
      parcel.delivery_status = DeliveryStatus.ASSIGNED;
      await parcel.save();
    } catch (error) {
      throw new HttpException(`${error.sqlMessage}`, 404);
    }
  }

  // Assign For Return
  async assignReturn(assignDto: AssignDto): Promise<void> {
    const { parcel_id, rider_id } = assignDto;
    const parcel = await Parcel.findOne(parcel_id);
    const rider = await Rider.findOne(rider_id);

    if (!parcel) {
      throw new NotFoundException('Parcel not found');
    }
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }
    const returnParcel = new ReturnParcel();
    returnParcel.parcel = parcel;
    returnParcel.rider = rider;
    try {
      await returnParcel.save();
      parcel.delivery_status = DeliveryStatus.RETURNING;
      await parcel.save();
    } catch (error) {
      throw new HttpException(`${error.sqlMessage}`, 404);
    }
  }

  // Payment Request List
  async payemntReqList(merchant_id) {
    try {
      return PaymentRequest.find({
        where: { merchant: merchant_id },
        relations: ['payment_parcel', 'payment_parcel.parcel'],
      });
    } catch (error) {
      throw new HttpException(`${error.sqlMessage}`, 404);
    }
  }

  // Find Payment Request
  async findPayemntReq(payment_id) {
    try {
      return PaymentRequest.findOne({
        where: { id: payment_id },
        relations: ['payment_parcel', 'payment_parcel.parcel'],
      });
    } catch (error) {
      throw new HttpException(`${error.sqlMessage}`, 404);
    }
  }

  // Count API
  async count(): Promise<any> {
    const repository = getRepository(Branch);

    try {
      const count = await repository.count();
      return {
        status: 'Success',
        count: count,
      };
    } catch (error) {
      // Handle the error
      console.error('Error while fetching count:', error);
      throw error;
    }
  }
}
