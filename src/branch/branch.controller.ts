import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { BranchDto } from './branch.dto';
import { BranchService } from './branch.service';

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
}
