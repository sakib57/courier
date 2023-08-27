import { HttpException, NotFoundException } from '@nestjs/common';
import { AssignDto } from 'src/common/assign.dto';
import { DeliveryParcel } from 'src/entities/delivery-parcel.entity';
import { DeliveryStatus, Parcel } from 'src/entities/parcel.entity';
import { Rider } from 'src/entities/rider.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(DeliveryParcel)
export class DeliveryParcelRepository extends Repository<DeliveryParcel> {
  // District Creare
}
