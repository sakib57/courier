import { IsNotEmpty } from 'class-validator';
import { DeliveryStatus } from 'src/entities/parcel.entity';

export class UpdateDeliveryStatusDto {
  @IsNotEmpty()
  status: DeliveryStatus;
}
