import { Injectable, NotFoundException } from '@nestjs/common';
import { Parcel } from 'src/entities/parcel.entity';
import { getRepository } from 'typeorm';
import { ParcelDto } from './parcel.dto';
import { ParcelRepository } from './parcel.repository';

@Injectable()
export class ParcelService {
  constructor(private parcelRepository: ParcelRepository) {}

  // Branch's Pickup Parcel List
  async branchParcelList(branch_id, query): Promise<Parcel[]> {
    if (query.hasOwnProperty('status') && query.status !== '') {
      return await getRepository(Parcel)
        .createQueryBuilder('parcel')
        .leftJoin('parcel.merchant', 'merchant')
        .leftJoin('merchant.branch', 'branch')
        .where('merchant.branch.id = :branch_id', branch_id)
        .andWhere('parcel.pickup_status = :status', { status: query.status })
        .getMany();
    }
    return await getRepository(Parcel)
      .createQueryBuilder('parcel')
      .leftJoin('parcel.merchant', 'merchant')
      .leftJoin('merchant.branch', 'branch')
      .where('merchant.branch.id = :branch_id', branch_id)
      .getMany();
  }

  // Merchant's Pickup Parcel List
  async merchantsParcelList(merchant_id, query): Promise<Parcel[]> {
    if (query.hasOwnProperty('status') && query.status !== '') {
      return await getRepository(Parcel)
        .createQueryBuilder('parcel')
        .leftJoin('parcel.merchant', 'merchant')
        .where('merchant.id = :merchant_id', merchant_id)
        .andWhere('parcel.pickup_status = :status', { status: query.status })
        .getMany();
    }
    return await getRepository(Parcel)
      .createQueryBuilder('parcel')
      .leftJoin('parcel.merchant', 'merchant')
      .where('merchant.id = :merchant_id', merchant_id)
      .getMany();
  }

  // Find parcel by id
  async parcel(id): Promise<any> {
    const parcel = await this.parcelRepository.findOne(id);
    if (!parcel) {
      throw new NotFoundException('Parcel not foud');
    }
    return parcel;
  }

  // Parcel req create
  async createParcelReq(parcelDto: ParcelDto): Promise<Parcel> {
    return this.parcelRepository.createParcelReq(parcelDto);
  }
}
