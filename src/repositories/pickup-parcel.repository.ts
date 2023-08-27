import { PickupParcel } from 'src/entities/pickup-parcel.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PickupParcel)
export class PickupParcelRepository extends Repository<PickupParcel> {}
