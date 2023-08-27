import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { DeliveryStatus } from 'src/entities/parcel.entity';

export class UpdateDeliveryStatusDto {
  @IsNotEmpty()
  @ApiProperty()
  status: DeliveryStatus;
}
