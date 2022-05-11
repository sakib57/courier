import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { District } from 'src/entities/district.entity';
import { Upazila } from 'src/entities/upazila.entity';
import { DistrictDto } from 'src/repositories/district.repository';
import { UpazilaDto } from 'src/repositories/upazila.repository';
import { AdminUpdateDto } from './admin-update.dto';
import { IAdmin } from './admin.interface';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  // Admins profile
  @Get('profile/:id')
  ridersProfile(@Param('admin_id') admin_id): Promise<IAdmin> {
    return this.adminService.adminProfile(admin_id);
  }

  // Admins profile update
  @Patch('profile/update/:id')
  ridersProfileUpdate(
    @Param('admin_id') admin_id,
    @Body() riderUpdateDto: AdminUpdateDto,
  ): Promise<IAdmin> {
    return this.adminService.adminProfileUpdate(admin_id, riderUpdateDto);
  }

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
  upazilaList(@Query('district') district): Promise<Upazila[]> {
    return this.adminService.upazilaList(district);
  }

  // Create Upazila
  @Post('/upazila/create')
  createUpazila(
    @Body(ValidationPipe) upazilaDto: UpazilaDto,
  ): Promise<Upazila> {
    return this.adminService.createUpazila(upazilaDto);
  }
}
