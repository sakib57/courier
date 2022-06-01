import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangePasswordDto } from 'src/common/change-password.dto';
import { Parcel } from 'src/entities/parcel.entity';
import { getRepository } from 'typeorm';
import { RiderUpdateDto } from './rider-update.dto';
import { IRider } from './rider.interface';
import { RiderRepository } from './rider.repository';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/common/util';
import { SearchQueryDto } from 'src/common/search-query.dto';
import { BranchRepository } from 'src/branch/branch.repository';

@Injectable()
export class RiderService {
  constructor(
    @InjectRepository(RiderRepository)
    private riderRepository: RiderRepository,
    @InjectRepository(BranchRepository)
    private branchRepository: BranchRepository,
  ) {}

  // Riders profile
  async riderProfile(id: number): Promise<IRider> {
    const rider = await this.riderRepository.findOne(id);
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
    const rider = await this.riderRepository.findOne(id);
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }
    rider.name = riderUpdateDto.name;
    rider.address = riderUpdateDto.address;
    rider.contact_number = riderUpdateDto.contact_number;

    try {
      rider.save();
    } catch (err) {
      throw new HttpException('Something wrong', 500);
    }
    return rider;
  }

  // Rider List
  async riderList(searchQueryDto: SearchQueryDto): Promise<IRider[]> {
    const branch = await this.branchRepository.findOne(
      searchQueryDto.branch_id,
    );
    let rider = null;

    if (branch) {
      rider = await this.riderRepository.find({
        where: {
          branch: branch,
        },
        relations: ['branch'],
      });
    } else {
      rider = await this.riderRepository.find({
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

  // Cgange password
  async changePassword(id, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;
    const rider = await this.riderRepository.findOne(id);
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
}
