import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignDto } from 'src/common/assign.dto';
import { Parcel, PickupStatus } from 'src/entities/parcel.entity';
import { ParcelService } from 'src/parcel/parcel.service';
import { BranchDto } from './branch.dto';
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
  create(@Body(ValidationPipe) branchDto: BranchDto) {
    return this.branchService.createBranch(branchDto);
  }

  @Get('list')
  index(): Promise<BranchDto[]> {
    return this.branchService.branchList();
  }

  // Pickup Parcel List
  @Get('pickup-parcel-list/:branch_id')
  parcelList(
    @Param() branch_id: number,
    @Query() query: PickupStatus,
  ): Promise<Parcel[]> {
    return this.parcelService.branchParcelList(branch_id, query);
  }

  @Post('assign/pickup')
  assignPickup(@Body(ValidationPipe) assignDto: AssignDto) {
    return this.branchService.assignPickup(assignDto);
  }
}
