import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { District } from 'src/entities/district.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(District)
export class DistrictRepository extends Repository<District> {
  // District List
  // District Creare
}

export class DistrictDto {
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

export class UpdateDistrictDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
