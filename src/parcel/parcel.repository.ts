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
  // Create parcel request
}
