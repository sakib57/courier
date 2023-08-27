import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import {
  DeliveryStatus,
  Parcel,
  PickupStatus,
} from 'src/entities/parcel.entity';
import { Connection, createConnection, getRepository } from 'typeorm';
import {
  ParcelDto,
  UpdateDeliveryStatusDto,
  UpdatePickupStatusDto,
} from './dto';
import { ParcelUpdateDto } from './dto/parcel.update.dto';
import * as Xlsx from 'xlsx';
import * as fs from 'fs';
import { XlsxParcelDTO } from './dto/xlsx-parcel.dto';
import { Merchant } from 'src/entities/merchant.entity';
import { Branch } from 'src/entities/branch.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ParcelService {
  // Branch's Pickup Parcel List
  async branchPickupParcelList(branch_id, query): Promise<Parcel[]> {
    if (query.hasOwnProperty('status') && query.status !== '') {
      return await getRepository(Parcel)
        .createQueryBuilder('parcel')
        .leftJoinAndSelect('parcel.pickupParcel', 'pickup_parcel')
        .leftJoinAndSelect('pickup_parcel.rider', 'rider')
        .leftJoinAndSelect('parcel.merchant', 'merchant')
        .leftJoinAndSelect('merchant.branch', 'branch')
        .where('merchant.branch.id = :branch_id', branch_id)
        .andWhere('parcel.pickup_status = :status', { status: query.status })
        .andWhere('parcel.delivery_status = :delivery_status', {
          delivery_status: DeliveryStatus.PENDIGN,
        })
        .getMany();
    }
    return await getRepository(Parcel)
      .createQueryBuilder('parcel')
      .leftJoinAndSelect('parcel.pickupParcel', 'pickup_parcel')
      .leftJoinAndSelect('pickup_parcel.rider', 'rider')
      .leftJoinAndSelect('parcel.merchant', 'merchant')
      .leftJoinAndSelect('merchant.branch', 'branch')
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
        .leftJoinAndSelect('parcel.deliveryParcel', 'delivery_parcel')
        .leftJoinAndSelect('delivery_parcel.rider', 'rider')
        .leftJoinAndSelect('parcel.merchant', 'merchant')
        .leftJoinAndSelect('merchant.branch', 'branch')
        .where('merchant.branch.id = :branch_id', branch_id)
        .andWhere('parcel.delivery_status = :status', { status: query.status })
        .andWhere('parcel.pickup_status = :pickup_status', {
          pickup_status: PickupStatus.STORED,
        })
        .getMany();
    }
    return await getRepository(Parcel)
      .createQueryBuilder('parcel')
      .leftJoinAndSelect('parcel.deliveryParcel', 'delivery_parcel')
      .leftJoinAndSelect('delivery_parcel.rider', 'rider')
      .leftJoinAndSelect('parcel.merchant', 'merchant')
      .leftJoinAndSelect('merchant.branch', 'branch')
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
        .leftJoinAndSelect('parcel.pickupParcel', 'pickup_parcel')
        .leftJoinAndSelect('pickup_parcel.rider', 'rider')
        .leftJoinAndSelect('parcel.merchant', 'merchant')
        .where('merchant.id = :merchant_id', merchant_id)
        .andWhere('parcel.pickup_status = :status', { status: query.status })
        .andWhere('parcel.delivery_status = :delivery_status', {
          delivery_status: DeliveryStatus.PENDIGN,
        })
        .getMany();
    }
    return await getRepository(Parcel)
      .createQueryBuilder('parcel')
      .leftJoinAndSelect('parcel.pickupParcel', 'pickup_parcel')
      .leftJoinAndSelect('pickup_parcel.rider', 'rider')
      .leftJoinAndSelect('parcel.merchant', 'merchant')
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
        .leftJoinAndSelect('parcel.deliveryParcel', 'delivery_parcel')
        .leftJoinAndSelect('delivery_parcel.rider', 'rider')
        .leftJoinAndSelect('parcel.merchant', 'merchant')
        .where('merchant.id = :merchant_id', merchant_id)
        .andWhere('parcel.delivery_status = :status', { status: query.status })
        .andWhere('parcel.pickup_status = :pickup_status', {
          pickup_status: PickupStatus.STORED,
        })
        .getMany();
    }
    return await getRepository(Parcel)
      .createQueryBuilder('parcel')
      .leftJoinAndSelect('parcel.deliveryParcel', 'delivery_parcel')
      .leftJoinAndSelect('delivery_parcel.rider', 'rider')
      .leftJoinAndSelect('parcel.merchant', 'merchant')
      .where('merchant.id = :merchant_id', merchant_id)
      .andWhere('parcel.pickup_status = :pickup_status', {
        pickup_status: PickupStatus.STORED,
      })
      .getMany();
  }

  // Find parcel by id
  async parcel(id: any): Promise<any> {
    const parcel = await getRepository(Parcel)
      .createQueryBuilder('parcel')
      .leftJoinAndSelect('parcel.merchant', 'merchant')
      .where('parcel.id = :id', id)
      .getOne();
    if (!parcel) {
      throw new NotFoundException('Parcel not foud');
    }
    return parcel;
  }

  // Parcel req create
  async createParcelReq(parcelDto: ParcelDto): Promise<Parcel> {
    const {
      merchant_id,
      order_id,
      i_branch_id,
      d_branch_id,
      pickup_location,
      pickup_date,
      delivery_date,
      customer_name,
      customer_phone,
      customer_district,
      customer_upazila,
      customer_road,
      customer_address,
      collect_amount,
      product_cost_amount,
      delivery_fees,
      cod_fees,
      discount,
      promo_discount,
      additional_charge,
      compensation_cost,
      weight,
      quantity,
      item_description,
      delivery_instruction,
    } = parcelDto;

    const merchant = await Merchant.findOne({ id: merchant_id });
    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }

    let i_branch = null;
    if (i_branch_id) {
      i_branch = await Branch.findOne({ id: i_branch_id });
      if (!i_branch) {
        throw new NotFoundException('Branch not found');
      }
    }

    let d_branch = null;
    if (d_branch_id) {
      d_branch = await Branch.findOne({ id: d_branch_id });
      if (!d_branch) {
        throw new NotFoundException('Branch not found');
      }
    }

    const parcel = new Parcel();
    parcel.merchant = merchant;
    parcel.order_id = order_id;
    parcel.i_branch = i_branch;
    parcel.d_branch = d_branch;
    parcel.pickup_location = pickup_location;
    parcel.pickup_date = pickup_date;
    parcel.delivery_date = delivery_date;
    parcel.customer_name = customer_name;
    parcel.customer_phone = customer_phone;
    parcel.customer_district = customer_district;
    parcel.customer_upazila = customer_upazila;
    parcel.customer_road = customer_road;
    parcel.customer_address = customer_address;
    parcel.collect_amount = collect_amount;
    parcel.product_cost_amount = product_cost_amount;
    parcel.delivery_fees = delivery_fees;
    parcel.cod_fees = cod_fees;
    parcel.discount = discount;
    parcel.promo_discount = promo_discount;
    parcel.additional_charge = additional_charge;
    parcel.compensation_cost = compensation_cost;
    parcel.weight = weight;
    parcel.quantity = quantity;
    parcel.item_description = item_description;
    parcel.delivery_instruction = delivery_instruction;

    try {
      await parcel.save();
    } catch (error) {
      console.log(error);
    }

    return parcel;
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

    data.forEach(async (v) => {
      const parcel = new Parcel();
      parcel.merchant = merchant;
      parcel.d_branch = d_branch;
      parcel.pickup_location = v.pickup_location;
      parcel.pickup_date = v.pickup_date;
      parcel.delivery_date = v.delivery_date;
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
    const {
      order_id,
      d_branch_id,
      pickup_location,
      pickup_date,
      delivery_date,
      customer_name,
      customer_phone,
      customer_district,
      customer_upazila,
      customer_road,
      customer_address,
      collect_amount,
      product_cost_amount,
      delivery_fees,
      cod_fees,
      discount,
      promo_discount,
      additional_charge,
      compensation_cost,
      weight,
      quantity,
      item_description,
      delivery_instruction,
    } = parcelUpdateDto;
    const parcel = Parcel.findOne({ id: id });
    if (!parcel) {
      throw new NotFoundException('Parcel not found');
    }

    const branch = await Branch.findOne({ id: d_branch_id });
    (await parcel).order_id = order_id;
    (await parcel).d_branch = branch;
    (await parcel).pickup_location = pickup_location;
    (await parcel).pickup_date = pickup_date;
    (await parcel).delivery_date = delivery_date;
    (await parcel).customer_name = customer_name;
    (await parcel).customer_phone = customer_phone;
    (await parcel).customer_district = customer_district;
    (await parcel).customer_upazila = customer_upazila;
    (await parcel).customer_road = customer_road;
    (await parcel).customer_address = customer_address;
    (await parcel).collect_amount = collect_amount;
    (await parcel).product_cost_amount = product_cost_amount;
    (await parcel).delivery_fees = delivery_fees;
    (await parcel).cod_fees = cod_fees;
    (await parcel).discount = discount;
    (await parcel).promo_discount = promo_discount;
    (await parcel).additional_charge = additional_charge;
    (await parcel).compensation_cost = compensation_cost;
    (await parcel).weight = weight;
    (await parcel).quantity = quantity;
    (await parcel).item_description = item_description;
    (await parcel).delivery_instruction = delivery_instruction;
    (await parcel).save();

    return parcel;
  }

  // Update Parcel Pickup Status
  async updateParcelPickupStatus(
    parcel_id,
    updatePickupStatusDto: UpdatePickupStatusDto,
  ) {
    const { status } = updatePickupStatusDto;
    const parcel = await Parcel.findOne({ id: parcel_id });
    if (!parcel) {
      throw new NotFoundException('Parcel not found');
    }
    parcel.pickup_status = status;
    // if (status == 'Stored') {
    //   parcel.pickup_date = new Date(Date.now());
    // }

    try {
      return parcel.save();
    } catch (err) {
      throw new HttpException('Something wrong', 500);
    }
  }

  // Update Parcel Delivery Status
  async updateParcelDeliveryStatus(
    parcel_id,
    updateDeliveryStatusDto: UpdateDeliveryStatusDto,
  ) {
    try {
      const parcel = await Parcel.findOne({
        where: { id: parcel_id },
        relations: ['merchant'],
      });
      if (!parcel) {
        throw new NotFoundException('Parcel not found');
      }
      parcel.delivery_status = updateDeliveryStatusDto.status;
      if (updateDeliveryStatusDto.status == 'Delivered') {
        const merchant = await Merchant.findOne({ id: parcel.merchant.id });
        const newWalletAmount =
          merchant.wallet + parseFloat(parcel.product_cost_amount.toString());
        merchant.wallet = newWalletAmount;
        await merchant.save();
      }
      return parcel.save();
    } catch (err) {
      console.log(err);
      throw new HttpException('Something wrong', 500);
    }
  }

  // Count API
  async count(
    merchant_id: number,
    pickupStatus?: string,
    delieryStatus?: string,
  ): Promise<any> {
    // Create a connection to the database
    const connection: Connection = await createConnection();
    const merchant = await Merchant.findOne({ id: merchant_id });

    try {
      // Get the count of users with a specific age using a where condition
      const parcelCount: number = await connection
        .getRepository(Parcel)
        .createQueryBuilder('parcel')
        .where('parcel.merchant = :merchant', { merchant })
        .where('parcel.pickup_status = :pickupStatus', { pickupStatus })
        .orWhere('parcel.delivery_status = :delieryStatus', { delieryStatus })
        .getCount();

      // Close the connection and return the result
      return parcelCount;
    } catch (error) {
      // Handle any errors
      console.error('Error occurred:', error);
      throw error;
    } finally {
      // Close the connection in the end
      await connection.close();
    }
  }
}
