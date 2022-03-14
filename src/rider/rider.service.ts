import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parcel } from 'src/entities/parcel.entity';
import { getRepository } from 'typeorm';
import { IRider } from './rider.interface';
import { RiderRepository } from './rider.repository';

@Injectable()
export class RiderService {
  constructor(
    @InjectRepository(RiderRepository)
    private riderRepository: RiderRepository,
  ) {}
  // Rider List
  async riderList(): Promise<IRider[]> {
    const rider = await this.riderRepository.find({ relations: ['branch'] });
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
}
