import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import {
  DeliveryStatus,
  Parcel,
  PickupStatus,
} from 'src/entities/parcel.entity';
import { getRepository } from 'typeorm';
import {
  ParcelDto,
  UpdateDeliveryStatusDto,
  UpdatePickupStatusDto,
} from './dto';
import { ParcelUpdateDto } from './dto/parcel.update.dto';
import { ParcelRepository } from './parcel.repository';

@Injectable()
export class ParcelService {
  constructor(private parcelRepository: ParcelRepository) {}

  // Branch's Pickup Parcel List
  async branchPickupParcelList(branch_id, query): Promise<Parcel[]> {
    if (query.hasOwnProperty('status') && query.status !== '') {
      return await getRepository(Parcel)
        .createQueryBuilder('parcel')
        .leftJoin('parcel.merchant', 'merchant')
        .leftJoin('merchant.branch', 'branch')
        .where('merchant.branch.id = :branch_id', branch_id)
        .andWhere('parcel.pickup_status = :status', { status: query.status })
        .andWhere('parcel.delivery_status = :delivery_status', {
          delivery_status: DeliveryStatus.PENDIGN,
        })
        .getMany();
    }
    return await getRepository(Parcel)
      .createQueryBuilder('parcel')
      .leftJoin('parcel.merchant', 'merchant')
      .leftJoin('merchant.branch', 'branch')
      .where('merchant.branch.id = :branch_id', branch_id)
      .andWhere('parcel.delivery_status = :delivery_status', {
        delivery_status: DeliveryStatus.PENDIGN,
      })
      .getMany();
  }

  // Branch's Delivery Parcel List
  async branchDeliveryParcelList(branch_id, query): Promise<Parcel[]> {
    if (query.hasOwnProperty('status') && query.status !== '') {
      return await getRepository(Parcel)
        .createQueryBuilder('parcel')
        .leftJoin('parcel.merchant', 'merchant')
        .leftJoin('merchant.branch', 'branch')
        .where('merchant.branch.id = :branch_id', branch_id)
        .andWhere('parcel.pickup_status = :status', { status: query.status })
        .andWhere('parcel.pickup_status = :pickup_status', {
          pickup_status: PickupStatus.STORED,
        })
        .getMany();
    }
    return await getRepository(Parcel)
      .createQueryBuilder('parcel')
      .leftJoin('parcel.merchant', 'merchant')
      .leftJoin('merchant.branch', 'branch')
      .where('merchant.branch.id = :branch_id', branch_id)
      .andWhere('parcel.pickup_status = :pickup_status', {
        pickup_status: PickupStatus.STORED,
      })
      .getMany();
  }

  // Merchant's Pickup Parcel List
  async merchantsPickupParcelList(merchant_id, query): Promise<Parcel[]> {
    if (query.hasOwnProperty('status') && query.status !== '') {
      return await getRepository(Parcel)
        .createQueryBuilder('parcel')
        .leftJoin('parcel.merchant', 'merchant')
        .where('merchant.id = :merchant_id', merchant_id)
        .andWhere('parcel.pickup_status = :status', { status: query.status })
        .andWhere('parcel.delivery_status = :delivery_status', {
          delivery_status: DeliveryStatus.PENDIGN,
        })
        .getMany();
    }
    return await getRepository(Parcel)
      .createQueryBuilder('parcel')
      .leftJoin('parcel.merchant', 'merchant')
      .where('merchant.id = :merchant_id', merchant_id)
      .andWhere('parcel.delivery_status = :delivery_status', {
        delivery_status: DeliveryStatus.PENDIGN,
      })
      .getMany();
  }

  // Merchant's Delivery Parcel List
  async merchantsDeliveryParcelList(merchant_id, query): Promise<Parcel[]> {
    if (query.hasOwnProperty('status') && query.status !== '') {
      return await getRepository(Parcel)
        .createQueryBuilder('parcel')
        .leftJoin('parcel.merchant', 'merchant')
        .where('merchant.id = :merchant_id', merchant_id)
        .andWhere('parcel.delivery_status = :status', { status: query.status })
        .andWhere('parcel.pickup_status = :pickup_status', {
          pickup_status: PickupStatus.STORED,
        })
        .getMany();
    }
    return await getRepository(Parcel)
      .createQueryBuilder('parcel')
      .leftJoin('parcel.merchant', 'merchant')
      .where('merchant.id = :merchant_id', merchant_id)
      .andWhere('parcel.pickup_status = :pickup_status', {
        pickup_status: PickupStatus.STORED,
      })
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

  // Parcel req update
  async updateParcelReq(
    id: number,
    parcelUpdateDto: ParcelUpdateDto,
  ): Promise<Parcel> {
    return this.parcelRepository.updateParcelReq(id, parcelUpdateDto);
  }

  // Update Parcel Pickup Status
  async updateParcelPickupStatus(
    parcel_id,
    updatePickupStatusDto: UpdatePickupStatusDto,
  ) {
    const { status } = updatePickupStatusDto;
    const parcel = await this.parcelRepository.findOne({ id: parcel_id });
    if (!parcel) {
      throw new NotFoundException('Parcel not found');
    }
    parcel.pickup_status = status;

    try {
      parcel.save();
    } catch (err) {
      throw new HttpException('Something wrong', 500);
    }
  }

  // Update Parcel Delivery Status
  async updateParcelDeliveryStatus(
    parcel_id,
    updateDeliveryStatusDto: UpdateDeliveryStatusDto,
  ) {
    const { status } = updateDeliveryStatusDto;
    const parcel = await this.parcelRepository.findOne({ id: parcel_id });
    if (!parcel) {
      throw new NotFoundException('Parcel not found');
    }
    parcel.delivery_status = status;

    try {
      parcel.save();
    } catch (err) {
      throw new HttpException('Something wrong', 500);
    }
  }
}
