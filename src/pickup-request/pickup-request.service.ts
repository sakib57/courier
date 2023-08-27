import { Injectable, NotFoundException } from '@nestjs/common';
import { SearchQueryDto } from 'src/common/search-query.dto';
import { Branch } from 'src/entities/branch.entity';
import { Merchant } from 'src/entities/merchant.entity';
import { PickupRequest } from 'src/entities/pickup-request.entity';
import { Rider } from 'src/entities/rider.entity';
import { PickupRequestUpdateDTO } from './dto/pickup-request-update.dto';
import { PickupRequestDTO } from './dto/pickup-request.dto';

@Injectable()
export class PickupRequestService {
  public async create(pickupRequestDto: PickupRequestDTO) {
    const merchant = await Merchant.findOne({
      id: pickupRequestDto.merchant_id,
    });
    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }

    const branch = await Branch.findOne({
      id: pickupRequestDto.branch_id,
    });
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
    const pickupRequest = new PickupRequest();
    pickupRequest.merchant = merchant;
    pickupRequest.branch = branch;
    pickupRequest.parcel_count = pickupRequestDto.parcel_count;
    pickupRequest.weight = pickupRequestDto.weight;
    pickupRequest.pickup_location = pickupRequestDto.pickup_location;

    return await pickupRequest.save();
  }

  public async update(
    id: number,
    pickupRequestUpdateDto: PickupRequestUpdateDTO,
  ) {
    const pickupRequest = await PickupRequest.findOne({ id: id });
    if (!pickupRequest) {
      throw new NotFoundException('Pickup Request not found');
    }

    if (pickupRequestUpdateDto.rider_id) {
      const rider = await Rider.findOne({
        id: pickupRequestUpdateDto.rider_id,
      });
      if (!rider) {
        throw new NotFoundException('Rider Not found');
      }
      pickupRequest.rider = rider;
    }

    pickupRequest.status = pickupRequestUpdateDto.status;
    pickupRequest.parcel_count = pickupRequestUpdateDto.parcel_count;

    pickupRequest.save();

    return await pickupRequest.save();
  }

  public async findAll(searchQueryDto: SearchQueryDto) {
    const branch = await Branch.findOne({ id: searchQueryDto.branch_id });
    const merchant = await Merchant.findOne({ id: searchQueryDto.merchant_id });
    const rider = await Rider.findOne({ id: searchQueryDto.rider_id });

    let pickupRequest = null;
    if (branch) {
      pickupRequest = await PickupRequest.find({
        where: {
          branch: branch,
        },
        relations: ['rider'],
      });
    } else if (rider) {
      pickupRequest = await PickupRequest.find({
        where: {
          rider: rider,
        },
      });
    } else if (merchant && searchQueryDto.status) {
      pickupRequest = await PickupRequest.find({
        where: {
          merchant: merchant,
          status: searchQueryDto.status,
        },
        relations: ['rider'],
      });
    } else if (merchant) {
      pickupRequest = await PickupRequest.find({
        where: {
          merchant: merchant,
        },
        relations: ['rider'],
      });
    }
    return pickupRequest || [];
  }
}
