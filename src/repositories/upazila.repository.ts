import { NotFoundException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { District } from 'src/entities/district.entity';
import { Upazila } from 'src/entities/upazila.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Upazila)
export class UpazilaRepository extends Repository<Upazila> {
  // Upazial List
  // Upazila Creare
}

export class UpazilaDto {
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  district_id: number;
}

export class UpdateUpazilaDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
