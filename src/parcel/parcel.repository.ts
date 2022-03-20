import { NotFoundException } from '@nestjs/common';
import { Branch } from 'src/entities/branch.entity';
import { Merchant } from 'src/entities/merchant.entity';
import { Parcel } from 'src/entities/parcel.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ParcelDto } from './dto/parcel.dto';
import { ParcelUpdateDto } from './dto/parcel.update.dto';

@EntityRepository(Parcel)
export class ParcelRepository extends Repository<Parcel> {
  // Create parcel request
  async createParcelReq(parcelDto: ParcelDto) {
    const {
      merchant_id,
      d_branch_id,
      pickup_location,
      customer_name,
      customer_phone,
      customer_address,
      collect_amount,
      weight,
      delivery_instruction,
    } = parcelDto;

    const merchant = await Merchant.findOne({ id: merchant_id });
    if (!merchant) {
      throw new NotFoundException('Merchant not found');
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
    parcel.d_branch = d_branch;
    parcel.pickup_location = pickup_location;
    parcel.customer_name = customer_name;
    parcel.customer_phone = customer_phone;
    parcel.customer_address = customer_address;
    parcel.collect_amount = collect_amount;
    parcel.weight = weight;
    parcel.delivery_instruction = delivery_instruction;

    try {
      await parcel.save();
    } catch (error) {
      console.log(error);
    }

    return parcel;
  }

  // Create parcel request
  async updateParcelReq(id, parcelUpdateDto: ParcelUpdateDto) {
    const {
      d_branch_id,
      pickup_location,
      customer_name,
      customer_phone,
      customer_address,
      collect_amount,
      weight,
      delivery_instruction,
    } = parcelUpdateDto;
    const parcel = this.findOne({ id: id });
    if (!parcel) {
      throw new NotFoundException('Parcel not found');
    }

    const branch = await Branch.findOne({ id: d_branch_id });
    (await parcel).d_branch = branch;
    (await parcel).pickup_location = pickup_location;
    (await parcel).customer_name = customer_name;
    (await parcel).customer_phone = customer_phone;
    (await parcel).customer_address = customer_address;
    (await parcel).collect_amount = collect_amount;
    (await parcel).weight = weight;
    (await parcel).delivery_instruction = delivery_instruction;
    (await parcel).save();

    return parcel;
  }
}
