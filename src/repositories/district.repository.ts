import { HttpException } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { District } from 'src/entities/district.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(District)
export class DistrictRepository extends Repository<District> {
  // District List
  async districtList() {
    return this.find();
  }

  // District Creare
  async createDistrict(districtDto: DistrictDto) {
    const { name } = districtDto;
    const district = new District();
    district.name = name;
    try {
      await district.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(`${district.name} Already exist`, 401);
      }
      throw new HttpException(`${error.sqlMessage}`, 404);
    }

    return district;
  }
}

export class DistrictDto {
  id: number;

  @IsNotEmpty()
  name: string;
}
