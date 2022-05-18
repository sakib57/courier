import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchRepository } from 'src/branch/branch.repository';
import { RiderController } from './rider.controller';
import { RiderRepository } from './rider.repository';
import { RiderService } from './rider.service';

@Module({
  imports: [TypeOrmModule.forFeature([RiderRepository, BranchRepository])],
  controllers: [RiderController],
  providers: [RiderService],
})
export class RiderModule {}
