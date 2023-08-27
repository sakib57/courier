import { ApiProperty } from '@nestjs/swagger';

export class StoreUpdateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  pickup_address: string;

  @ApiProperty()
  return_address: string;

  @ApiProperty()
  status: string;
}
