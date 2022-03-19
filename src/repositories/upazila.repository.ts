import { NotFoundException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { District } from 'src/entities/district.entity';
import { Upazila } from 'src/entities/upazila.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Upazila)
export class UpazilaRepository extends Repository<Upazila> {
  // Upazial List
  async upazilaList() {
    return this.find();
  }

  // Upazila Creare
  async createUpazila(upazilaDto: UpazilaDto) {
    const { name, district_id } = upazilaDto;

    const district = await District.findOne(district_id);
    if (!district) {
      throw new NotFoundException('District not found');
    }
    const upazila = new Upazila();
    upazila.name = name;
    upazila.district = district;
    await upazila.save();
    return upazila;
  }
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
