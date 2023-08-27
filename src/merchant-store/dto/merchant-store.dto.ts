import { ApiProperty } from '@nestjs/swagger';

export class StoreDto {
  @ApiProperty()
  merchant_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  pickup_address: string;

  @ApiProperty()
  return_address: string;
}
