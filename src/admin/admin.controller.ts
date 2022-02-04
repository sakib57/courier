import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { District } from 'src/entities/district.entity';
import { Upazila } from 'src/entities/upazila.entity';
import { DistrictDto } from 'src/repositories/district.repository';
import { UpazilaDto } from 'src/repositories/upazila.repository';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  // District List
  @Get('/district/list')
  districtList(): Promise<District[]> {
    return this.adminService.districtList();
  }

  // Create District
  @Post('/district/create')
  createDistrict(
    @Body(ValidationPipe) districtDto: DistrictDto,
  ): Promise<District> {
    return this.adminService.createDistrict(districtDto);
  }

  // Upazila List
  @Get('/upazila/list')
  upazilaList(): Promise<Upazila[]> {
    return this.adminService.upazilaList();
  }

  // Create Upazila
  @Post('/upazila/create')
  createUpazila(
    @Body(ValidationPipe) upazilaDto: UpazilaDto,
  ): Promise<Upazila> {
    return this.adminService.createUpazila(upazilaDto);
  }
}
