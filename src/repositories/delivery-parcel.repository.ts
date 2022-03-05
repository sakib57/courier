import { HttpException, NotFoundException } from '@nestjs/common';
import { AssignDto } from 'src/common/assign.dto';
import { DeliveryParcel } from 'src/entities/delivery-parcel.entity';
import { DeliveryStatus, Parcel } from 'src/entities/parcel.entity';
import { Rider } from 'src/entities/rider.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(DeliveryParcel)
export class DeliveryParcelRepository extends Repository<DeliveryParcel> {
  // District Creare
  async assignForDelivery(assignDto: AssignDto): Promise<void> {
    const { parcel_id, rider_id } = assignDto;
    const parcel = await Parcel.findOne(parcel_id);
    const rider = await Rider.findOne(rider_id);

    if (!parcel) {
      throw new NotFoundException('Parcel not found');
    }
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }
    const deliveryParcel = new DeliveryParcel();
    deliveryParcel.parcel = parcel;
    deliveryParcel.rider = rider;
    try {
      await deliveryParcel.save();
      parcel.delivery_status = DeliveryStatus.ASSIGNED;
      await parcel.save();
    } catch (error) {
      throw new HttpException(`${error.sqlMessage}`, 404);
    }
  }
}
