import { HttpException, NotFoundException } from '@nestjs/common';
import { AssignDto } from 'src/common/assign.dto';
import { Parcel } from 'src/entities/parcel.entity';
import { PickupParcel } from 'src/entities/pickup-parcel.entity';
import { Rider } from 'src/entities/rider.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PickupParcel)
export class PickupParcelRepository extends Repository<PickupParcel> {
  // District Creare
  async assignForPickup(assignDto: AssignDto): Promise<void> {
    const { parcel_id, rider_id } = assignDto;
    const parcel = await Parcel.findOne(parcel_id);
    const rider = await Rider.findOne(rider_id);

    if (!parcel) {
      throw new NotFoundException('Parcel not found');
    }
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }
    const pickupParcel = new PickupParcel();
    pickupParcel.parcel = parcel;
    pickupParcel.rider = rider;
    try {
      await pickupParcel.save();
    } catch (error) {
      throw new HttpException(`${error.sqlMessage}`, 404);
    }
  }
}
