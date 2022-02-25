import { Injectable } from '@nestjs/common';
import { Parcel } from 'src/entities/parcel.entity';
import { ParcelDto } from './parcel.dto';
import { ParcelRepository } from './parcel.repository';

@Injectable()
export class ParcelService {
  constructor(private parcelRepository: ParcelRepository) {}

  // Parcel List
  async parcelList(branch_id): Promise<Parcel[]> {
    if (branch_id !== '' || branch_id != null) {
      return this.parcelRepository.find(branch_id);
    }
    return this.parcelRepository.find();
  }

  // Parcel req create
  async createParcelReq(parcelDto: ParcelDto): Promise<Parcel> {
    return this.parcelRepository.createParcelReq(parcelDto);
  }
}
