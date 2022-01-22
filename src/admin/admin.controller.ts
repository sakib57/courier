import { Controller } from '@nestjs/common';
import { BranchService } from 'src/branch/branch.service';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private branchService: BranchService,
  ) {}
}
