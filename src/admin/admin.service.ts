import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from 'src/entities/district.entity';
import {
  DistrictDto,
  DistrictRepository,
} from 'src/repositories/district.repository';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(DistrictRepository)
    private districtRepository: DistrictRepository,
  ) {}
  // District List
  async districtList(): Promise<District[]> {
    return this.districtRepository.districtList();
  }

  // Create District
  async createDistrict(districtDto: DistrictDto) {
    return this.districtRepository.createDistrict(districtDto);
  }
}
