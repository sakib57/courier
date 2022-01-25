import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchRepository } from './branch.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BranchRepository])],
  providers: [BranchService],
  controllers: [BranchController],
})
export class BranchModule {}
