import { IsNotEmpty } from 'class-validator';
import { PickupStatus } from 'src/entities/parcel.entity';

export class UpdatePickupStatusDto {
  @IsNotEmpty()
  status: PickupStatus;
}
