import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SearchQueryDto {
  @ApiProperty()
  @IsOptional()
  branch_id: number;

  @ApiProperty()
  @IsOptional()
  merchant_id: number;

  @ApiProperty()
  @IsOptional()
  rider_id: number;

  @ApiProperty()
  status: string;
}
