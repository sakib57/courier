import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from 'src/entities/district.entity';
import { Upazila } from 'src/entities/upazila.entity';
import {
  DistrictDto,
  DistrictRepository,
  UpdateDistrictDto,
} from 'src/repositories/district.repository';
import {
  UpazilaDto,
  UpazilaRepository,
  UpdateUpazilaDto,
} from 'src/repositories/upazila.repository';
import { AdminUpdateDto } from './admin-update.dto';
import { IAdmin } from './admin.interface';
import { AdminRepository } from './admin.repository';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/common/util';
import { ChangePasswordDto } from 'src/common/change-password.dto';
import { Admin } from 'src/entities/admin.entity';
import { Road } from 'src/entities/road.entity';
import { RoadDto, UpdateRoadDto } from 'src/dto/road.dto';

@Injectable()
export class AdminService {
  // Admins profile
  async adminProfile(id: number): Promise<IAdmin> {
    const admin = await Admin.findOne(id);
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
    const admin = await Admin.findOne(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    admin.name = adminUpdateDto.name;
    admin.image = adminUpdateDto.image;

    try {
      admin.save();
    } catch (err) {
      throw new HttpException('Something wrong', 500);
    }
    return admin;
  }

  // District List
  async districtList(): Promise<District[]> {
    return District.find();
  }

  // Create District
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

  // Update District
  async updateDistrict(id: number, updateDistrictDto: UpdateDistrictDto) {
    const district = await District.findOne({ id: id });

    if (!district) {
      return new NotFoundException('District not found');
    }
    district.name = updateDistrictDto.name;
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

  // Upazila List
  async upazilaList(district): Promise<Upazila[]> {
    if (district != undefined) {
      return await Upazila.find({ district: district });
    } else {
      return await Upazila.find();
    }
  }

  // Create Upazila
  async createUpazila(upazilaDto: UpazilaDto) {
    const { name, district_id } = upazilaDto;

    const district = await District.findOne({ id: district_id });
    if (!district) {
      throw new NotFoundException('District not found');
    }
    const upazila = new Upazila();
    upazila.name = name;
    upazila.district = district;
    try {
      await upazila.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(`${upazila.name} Already exist`, 401);
      }
      throw new HttpException(`${error.sqlMessage}`, 404);
    }
    return upazila;
  }

  // Update Upazila
  async updateUpazila(id: number, updateUpazilaDto: UpdateUpazilaDto) {
    const upazila = await Upazila.findOne({ id: id });
    if (!upazila) {
      throw new NotFoundException('Upazila not found');
    }
    upazila.name = updateUpazilaDto.name;
    try {
      await upazila.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(`${upazila.name} Already exist`, 401);
      }
      throw new HttpException(`${error.sqlMessage}`, 404);
    }
    return upazila;
  }

  // Road List
  async roadList(upazila): Promise<Road[]> {
    if (upazila != undefined) {
      return await Road.find({ upazila: upazila });
    } else {
      return await Road.find();
    }
  }

  // Create Upazila
  async createRoad(roadDto: RoadDto) {
    const { name, upazila_id } = roadDto;

    const upazila = await Upazila.findOne({ id: upazila_id });
    if (!upazila) {
      throw new NotFoundException('District not found');
    }
    const road = new Road();
    road.name = name;
    road.upazila = upazila;
    try {
      await road.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(`${road.name} Already exist`, 401);
      }
      throw new HttpException(`${error.sqlMessage}`, 404);
    }
    return road;
  }

  // Update Road
  async updateRoad(id: number, updateRoadDto: UpdateRoadDto) {
    const road = await Road.findOne({ id: id });
    if (!road) {
      throw new NotFoundException('Road not found');
    }
    road.name = updateRoadDto.name;
    try {
      await road.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(`${road.name} Already exist`, 401);
      }
      throw new HttpException(`${error.sqlMessage}`, 404);
    }
    return road;
  }

  // Cgange password
  async changePassword(id, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;
    const admin = await Admin.findOne(id);
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
