import { ApiProperty } from '@nestjs/swagger';

export class AdminUpdateDto {
  @ApiProperty()
  name: string;
}
