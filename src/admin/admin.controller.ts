import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from 'src/common/change-password.dto';
import { District } from 'src/entities/district.entity';
import { Upazila } from 'src/entities/upazila.entity';
import {
  DistrictDto,
  UpdateDistrictDto,
} from 'src/repositories/district.repository';
import {
  UpazilaDto,
  UpdateUpazilaDto,
} from 'src/repositories/upazila.repository';
import { AdminUpdateDto } from './admin-update.dto';
import { IAdmin } from './admin.interface';
import { AdminService } from './admin.service';
import { Road } from 'src/entities/road.entity';
import { RoadDto, UpdateRoadDto } from 'src/dto/road.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import PermissionGuard from 'src/auth/guards/role.guard';
import { ParcelPermission } from 'src/permission/enums';

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
  ridersProfile(@Param('id') id): Promise<IAdmin> {
    return this.adminService.adminProfile(id);
  }

  // Admins profile update
  @Patch('profile/update/:id')
  ridersProfileUpdate(
    @Param('id') id,
    @Body() riderUpdateDto: AdminUpdateDto,
  ): Promise<IAdmin> {
    return this.adminService.adminProfileUpdate(id, riderUpdateDto);
  }

  // District List
  @Get('/district/list')
  districtList(): Promise<District[]> {
    return this.adminService.districtList();
  }

  // Create District
  @UseGuards(JwtAuthGuard)
  @Post('/district/create')
  createDistrict(
    @Body(ValidationPipe) districtDto: DistrictDto,
  ): Promise<District> {
    return this.adminService.createDistrict(districtDto);
  }

  // Update District
  @Patch('/district/:id')
  updateDistrict(
    @Param('id') id: number,
    @Body(ValidationPipe) updateDistrictDto: UpdateDistrictDto,
  ): Promise<any> {
    return this.adminService.updateDistrict(id, updateDistrictDto);
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

  // Update Upazila
  @Patch('/upazila/:id')
  updateUpazila(
    @Param('id') id: number,
    @Body(ValidationPipe) updateUpazilaDto: UpdateUpazilaDto,
  ): Promise<any> {
    return this.adminService.updateUpazila(id, updateUpazilaDto);
  }

  // Road List
  @Get('/road/list')
  roadList(@Query('upazila') upazila): Promise<Road[]> {
    return this.adminService.roadList(upazila);
  }

  // Create Road
  @Post('/road/create')
  createRoad(@Body(ValidationPipe) roadDto: RoadDto): Promise<Road> {
    return this.adminService.createRoad(roadDto);
  }

  // Update Road
  @Patch('/road/:id')
  updateRoad(
    @Param('id') id: number,
    @Body(ValidationPipe) updateRoadDto: UpdateRoadDto,
  ): Promise<any> {
    return this.adminService.updateRoad(id, updateRoadDto);
  }

  // Change Password
  @Post('change-password/:id')
  changePassword(
    @Param('id') id,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ) {
    return this.adminService.changePassword(id, changePasswordDto);
  }

  // Dashboard
  @Get('dashboard')
  dashboard() {
    return this.adminService.adminDashboard();
  }
}
