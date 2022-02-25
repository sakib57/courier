import { IsNotEmpty } from 'class-validator';

export class AssignDto {
  @IsNotEmpty()
  parcel_id: number;

  @IsNotEmpty()
  rider_id: number;
}
