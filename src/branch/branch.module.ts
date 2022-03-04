import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchRepository } from './branch.repository';
import { PickupParcelRepository } from 'src/repositories/pickup-parcel.repository';
import { ParcelModule } from 'src/parcel/parcel.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BranchRepository, PickupParcelRepository]),
    ParcelModule,
  ],
  providers: [BranchService],
  controllers: [BranchController],
})
export class BranchModule {}
