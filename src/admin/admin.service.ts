import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from 'src/entities/district.entity';
import { Upazila } from 'src/entities/upazila.entity';
import {
  DistrictDto,
  DistrictRepository,
} from 'src/repositories/district.repository';
import {
  UpazilaDto,
  UpazilaRepository,
} from 'src/repositories/upazila.repository';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(DistrictRepository)
    private districtRepository: DistrictRepository,

    @InjectRepository(UpazilaRepository)
    private upazilaRepository: UpazilaRepository,
  ) {}
  // District List
  async districtList(): Promise<District[]> {
    return this.districtRepository.districtList();
  }

  // Create District
  async createDistrict(districtDto: DistrictDto) {
    return this.districtRepository.createDistrict(districtDto);
  }

  // Upazila List
  async upazilaList(district): Promise<Upazila[]> {
    return this.upazilaRepository.upazilaList(district);
  }

  // Create Upazila
  async createUpazila(upazilaDto: UpazilaDto) {
    return this.upazilaRepository.createUpazila(upazilaDto);
  }
}
