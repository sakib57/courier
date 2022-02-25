import { NotFoundException } from '@nestjs/common';
import { Merchant } from 'src/entities/merchant.entity';
import { Parcel } from 'src/entities/parcel.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ParcelDto } from './parcel.dto';

@EntityRepository(Parcel)
export class ParcelRepository extends Repository<Parcel> {
  // Create parcel request
  async createParcelReq(parcelDto: ParcelDto) {
    const {
      merchant_id,
      pickup_location,
      customer_name,
      customer_phone,
      customer_address,
      collect_ammount,
      weight,
      delivery_instruction,
    } = parcelDto;

    const merchant = await Merchant.findOne(merchant_id);
    if (!merchant) {
      throw new NotFoundException('Merchant not found');
    }

    const parcel = new Parcel();
    parcel.merchant = merchant;
    parcel.pickup_location = pickup_location;
    parcel.customer_name = customer_name;
    parcel.customer_phone = customer_phone;
    parcel.customer_address = customer_address;
    parcel.collect_amount = collect_ammount;
    parcel.weight = weight;
    parcel.delivery_instruction = delivery_instruction;

    try {
      await parcel.save();
    } catch (error) {
      console.log(error);
    }

    return parcel;
  }
}
