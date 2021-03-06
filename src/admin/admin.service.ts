import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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
import { AdminUpdateDto } from './admin-update.dto';
import { IAdmin } from './admin.interface';
import { AdminRepository } from './admin.repository';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/common/util';
import { ChangePasswordDto } from 'src/common/change-password.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository,

    @InjectRepository(DistrictRepository)
    private districtRepository: DistrictRepository,

    @InjectRepository(UpazilaRepository)
    private upazilaRepository: UpazilaRepository,
  ) {}

  // Admins profile
  async adminProfile(id: number): Promise<IAdmin> {
    const admin = await this.adminRepository.findOne(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  // Admins profile update
  async adminProfileUpdate(
    id: number,
    adminUpdateDto: AdminUpdateDto,
  ): Promise<IAdmin> {
    const admin = await this.adminRepository.findOne(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    admin.name = adminUpdateDto.name;

    try {
      admin.save();
    } catch (err) {
      throw new HttpException('Something wrong', 500);
    }
    return admin;
  }

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

  // Cgange password
  async changePassword(id, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;
    const admin = await this.adminRepository.findOne(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    const isMatched = await admin.validatePassword(oldPassword);
    if (isMatched) {
      admin.salt = await bcrypt.genSalt();
      admin.password = await hashPassword(newPassword, admin.salt);
      await admin.save();
      return admin;
    } else {
      throw new NotFoundException("Old password didn't match");
    }
  }
}
