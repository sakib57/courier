import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { ParcelModule } from 'src/parcel/parcel.module';

@Module({
  imports: [ParcelModule],
  providers: [BranchService],
  controllers: [BranchController],
})
export class BranchModule {}
