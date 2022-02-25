import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignDto } from 'src/common/assign.dto';
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
  constructor(private branchService: BranchService) {}

  @Post('create')
  create(@Body(ValidationPipe) branchDto: BranchDto) {
    return this.branchService.createBranch(branchDto);
  }

  @Get('list')
  index(): Promise<BranchDto[]> {
    return this.branchService.branchList();
  }

  @Post('assign/pickup')
  assignPickup(@Body(ValidationPipe) assignDto: AssignDto) {
    return this.branchService.assignPickup(assignDto);
  }
}
