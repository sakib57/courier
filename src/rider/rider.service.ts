import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parcel } from 'src/entities/parcel.entity';
import { Rider } from 'src/entities/rider.entity';
import { getRepository } from 'typeorm';
import { RiderRepository } from './rider.repository';

@Injectable()
export class RiderService {
  constructor(
    @InjectRepository(RiderRepository)
    private riderRepository: RiderRepository,
  ) {}
  // Rider List
  async riderList(): Promise<Rider[]> {
    return this.riderRepository.find();
  }

  // Rider's parcels
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
}
