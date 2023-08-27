import { Module } from '@nestjs/common';
import { BranchOpreatorService } from './branch-opreator.service';
import { BranchOpreatorController } from './branch-opreator.controller';

@Module({
  providers: [BranchOpreatorService],
  controllers: [BranchOpreatorController]
})
export class BranchOpreatorModule {}
