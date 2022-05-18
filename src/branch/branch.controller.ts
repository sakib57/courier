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
import { AssignDto } from 'src/common/assign.dto';
import { ChangePasswordDto } from 'src/common/change-password.dto';
import { Branch } from 'src/entities/branch.entity';
import { Parcel, PickupStatus } from 'src/entities/parcel.entity';
import { ParcelService } from 'src/parcel/parcel.service';
import { BranchUpdateDto } from './branch-update.dto';
import { BranchDto } from './branch.dto';
import { IBranch } from './branch.interface';
import { BranchService } from './branch.service';

@ApiTags('Branch')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('branch')
export class BranchController {
  constructor(
    private branchService: BranchService,
    private parcelService: ParcelService,
  ) {}

  @Post('create')
  create(@Body(ValidationPipe) branchDto: BranchDto): Promise<IBranch> {
    return this.branchService.createBranch(branchDto);
  }

  @Get('list')
  index(@Query('upazila') upazila): Promise<Branch[]> {
    return this.branchService.branchList(upazila);
  }

  // Branch profile
  @Get('profile/:id')
  branchProfile(@Param('branch_id') branch_id): Promise<IBranch> {
    return this.branchService.branchProfile(branch_id);
  }

  // Branch profile update
  @Patch('profile/update/:id')
  branchProfileUpdate(
    @Param('id') id,
    @Body() branchUpdateDto: BranchUpdateDto,
  ): Promise<IBranch> {
    return this.branchService.branchProfileUpdate(id, branchUpdateDto);
  }

  // Pickup Parcel List
  @Get('pickup-parcel-list/:branch_id')
  parcelPickupList(
    @Param() branch_id: number,
    @Query() query: PickupStatus,
  ): Promise<Parcel[]> {
    return this.parcelService.branchPickupParcelList(branch_id, query);
  }

  // Delivery Parcel List
  @Get('delivery-parcel-list/:branch_id')
  parceDeliverylList(
    @Param() branch_id: number,
    @Query() query: PickupStatus,
  ): Promise<Parcel[]> {
    return this.parcelService.branchDeliveryParcelList(branch_id, query);
  }

  // Assign for pickup
  @Post('assign/pickup')
  assignPickup(@Body(ValidationPipe) assignDto: AssignDto) {
    return this.branchService.assignPickup(assignDto);
  }

  // Assign for delivery
  @Post('assign/delivery')
  assignDelivery(@Body(ValidationPipe) assignDto: AssignDto) {
    return this.branchService.assignDelivery(assignDto);
  }

  // Change Password
  @Post('change-password/:id')
  changePassword(
    @Param('id') id,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ) {
    return this.branchService.changePassword(id, changePasswordDto);
  }
}
