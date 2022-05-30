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
import * as Xlsx from 'xlsx';
import * as fs from 'fs';
import { XlsxParcelDTO } from './dto/xlsx-parcel.dto';
import { Merchant } from 'src/entities/merchant.entity';
import { Branch } from 'src/entities/branch.entity';

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

  // Bulk Xlsx Parcel req create
  async createParcelReqXlsx(xlsxParcelDTO: XlsxParcelDTO): Promise<any> {
    const file = Xlsx.readFile('./temp/import.xlsx');
    const sheets = file.SheetNames;
    const data = [];
    for (let i = 0; i < sheets.length; i++) {
      const sheetName = sheets[i];
      const sheetData = Xlsx.utils.sheet_to_json(file.Sheets[sheetName]);
      sheetData.forEach((v) => {
        data.push(v);
      });
    }
    const merchant = await Merchant.findOne({ id: xlsxParcelDTO.id });
    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }

    let d_branch = null;
    if (xlsxParcelDTO.d_branch_id) {
      d_branch = await Branch.findOne({ id: xlsxParcelDTO.d_branch_id });
      if (!d_branch) {
        throw new NotFoundException('Branch not found');
      }
    }

    console.log(data);
    data.forEach(async (v) => {
      const parcel = new Parcel();
      parcel.merchant = merchant;
      parcel.d_branch = d_branch;
      parcel.pickup_location = v.pickup_location;
      parcel.customer_name = v.customer_name;
      parcel.customer_phone = v.customer_phone;
      parcel.customer_address = v.customer_address;
      parcel.collect_amount = v.collect_amount;
      parcel.weight = v.weight;
      parcel.delivery_instruction = v.delivery_instruction;

      try {
        await parcel.save();
      } catch (error) {
        console.log(error);
      }
    });
    fs.unlinkSync('./temp/import.xlsx');
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
    if (status == 'Stored') {
      parcel.pickup_date = new Date(Date.now());
    }

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
    if (status == 'Delivered') {
      parcel.pickup_date = new Date(Date.now());
    }
    try {
      parcel.save();
    } catch (err) {
      throw new HttpException('Something wrong', 500);
    }
  }
}
