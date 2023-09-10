import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { ChangePasswordDto } from 'src/common/change-password.dto';
import { DeliveryStatus, Parcel } from 'src/entities/parcel.entity';
import { Between, getRepository } from 'typeorm';
import { RiderUpdateDto } from './rider-update.dto';
import { IRider } from './rider.interface';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/common/util';
import { SearchQueryDto } from 'src/common/search-query.dto';
import { Rider } from 'src/entities/rider.entity';
import { Branch } from 'src/entities/branch.entity';
import { RideDto } from './ride.dto';
import { Ride } from 'src/entities/ride.entity';
import { PickupRequest } from 'src/entities/pickup-request.entity';
import { PickupParcel } from 'src/entities/pickup-parcel.entity';

@Injectable()
export class RiderService {
  // Riders profile
  async riderProfile(id: number): Promise<IRider> {
    const rider = await Rider.findOne({
      where: { id: id },
      relations: ['branch'],
    });
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }
    return rider;
  }

  // Riders profile update
  async riderProfileUpdate(
    id: number,
    riderUpdateDto: RiderUpdateDto,
  ): Promise<IRider> {
    const rider = await Rider.findOne(id);
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }
    rider.name = riderUpdateDto.name;
    rider.address = riderUpdateDto.address;
    rider.contact_number = riderUpdateDto.contact_number;
    rider.image = riderUpdateDto.image;
    rider.isActive = riderUpdateDto.isActive;

    try {
      rider.save();
    } catch (err) {
      throw new HttpException('Something wrong', 500);
    }
    return rider;
  }

  // Rider List
  async riderList(searchQueryDto: SearchQueryDto): Promise<IRider[]> {
    const branch = await Branch.findOne({
      id: searchQueryDto.branch_id,
    });
    let rider = null;

    if (branch) {
      rider = await Rider.find({
        where: {
          branch: branch,
        },
        relations: ['branch'],
      });
    } else {
      rider = await Rider.find({
        relations: ['branch'],
      });
    }

    const riderNew = [];
    rider.map((value) => {
      const response: IRider = {
        id: value.id,
        name: value.name,
        email: value.email,
        address: value.address,
        contact_number: value.contact_number,
        isActive: value.isActive,
        branch: value.branch,
        image: value.image,
      };
      riderNew.push(response);
    });

    return riderNew;
  }

  // Rider's picup parcels
  async ridersPickupParcels(rider_id, query): Promise<Parcel[]> {
    let from = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let to = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (
      query.hasOwnProperty('from') &&
      query.from !== '' &&
      query.hasOwnProperty('to') &&
      query.to !== ''
    ) {
      from = query.from;
      to = query.to;
    } else if (query.hasOwnProperty('from') && query.from !== '') {
      from = query.from;
      to = new Date().toISOString().slice(0, 19).replace('T', ' ');
    } else {
      from = new Date().toISOString().slice(0, 19).replace('T', ' ');
      to = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    console.log(from);
    console.log(to);
    return await getRepository(Parcel)
      .createQueryBuilder('parcel')
      .leftJoin('parcel.pickupParcel', 'pickupParcel')
      .leftJoin('pickupParcel.rider', 'rider')
      .where('rider.id = :id', { id: rider_id })
      // .andWhere('pickupParcel.created_at >= :from', { from: from })
      // .andWhere('pickupParcel.created_at <= :to', { to: to })
      .getMany();
  }

  // Rider's delivery parcels
  async ridersDeliveryParcels(rider_id, query): Promise<Parcel[]> {
    let from = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let to = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (
      query.hasOwnProperty('from') &&
      query.from !== '' &&
      query.hasOwnProperty('to') &&
      query.to !== ''
    ) {
      from = query.from;
      to = query.to;
    } else if (query.hasOwnProperty('from') && query.from !== '') {
      from = query.from;
      to = new Date().toISOString().slice(0, 19).replace('T', ' ');
    } else {
      from = new Date().toISOString().slice(0, 19).replace('T', ' ');
      to = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    console.log(from);
    console.log(to);
    return await getRepository(Parcel)
      .createQueryBuilder('parcel')
      .leftJoin('parcel.deliveryParcel', 'deliveryParcel')
      .leftJoin('deliveryParcel.rider', 'rider')
      .where('rider.id = :id', { id: rider_id })
      // .andWhere('deliveryParcel.created_at >= :from', { from: from })
      // .andWhere('deliveryParcel.created_at <= :to', { to: to })
      .getMany();
  }

  // Create Ride
  async createRide(rideDto: RideDto): Promise<Ride> {
    const { rider_id, parcel_count } = rideDto;
    const rider = await Rider.findOne({ id: rider_id });
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }

    const ride = new Ride();
    ride.rider = rider;
    ride.parcel_count = parcel_count;

    try {
      await ride.save();
    } catch (error) {
      console.log(error);
    }

    return ride;
  }

  // Ride List
  async rideList(rider_id: number): Promise<Ride[]> {
    const rideList = await Ride.find({
      where: { rider: rider_id },
    });
    return rideList;
  }

  // Cgange password
  async changePassword(id, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;
    const rider = await Rider.findOne(id);
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }
    const isMatched = await rider.validateRiderPassword(oldPassword);
    if (isMatched) {
      rider.salt = await bcrypt.genSalt();
      rider.password = await hashPassword(newPassword, rider.salt);
      await rider.save();
      return rider;
    } else {
      throw new NotFoundException("Old password didn't match");
    }
  }

  // Count API
  async count(): Promise<any> {
    const repository = getRepository(Rider);

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

  // Dashboard
  async riderDashboard(param: any, query: any) {
    const rider = await Rider.findOne({ id: param.rider_id });
    let totalPickupRequest: any;
    let totalParcel: any;
    let totalCollectAmount = 0;

    if (query.start_date && query.end_date) {
      console.log('have both');
      totalPickupRequest = await PickupRequest.find({
        where: {
          rider: rider,
          created_at: Between(query.start_date, query.end_date),
        },
      });

      totalParcel = await PickupParcel.find({
        where: {
          rider: rider,
          created_at: Between(query.start_date, query.end_date),
        },
        relations: ['parcel'],
      });
    } else {
      totalPickupRequest = await PickupRequest.find({
        rider: rider,
      });
      totalParcel = await PickupParcel.find({
        relations: ['parcel'],
      });
    }

    totalParcel.map((tParcel: any) => {
      tParcel.parcel.map((parcel: any) => {
        if (parcel.delivery_status == DeliveryStatus.DELIVERED) {
          totalCollectAmount += parseFloat(parcel.collect_amount.toString());
        }
      });
    });
    return {
      pickupRequest: totalPickupRequest,
      parcel: totalParcel,
      collectAmount: totalCollectAmount,
    };
  }
}
