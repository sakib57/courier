import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RoadDto {
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  upazila_id: number;
}

export class UpdateRoadDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
