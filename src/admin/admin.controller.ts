import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { District } from 'src/entities/district.entity';
import { DistrictDto } from 'src/repositories/district.repository';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('/district/list')
  districtList(): Promise<District[]> {
    return this.adminService.districtList();
  }

  @Post('/district/create')
  createDistrict(
    @Body(ValidationPipe) districtDto: DistrictDto,
  ): Promise<District> {
    return this.adminService.createDistrict(districtDto);
  }
}
