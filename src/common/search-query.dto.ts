import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SearchQueryDto {
  @ApiProperty()
  @IsOptional()
  branch_id: number;
}
