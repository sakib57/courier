import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictRepository } from 'src/repositories/district.repository';
import { UpazilaRepository } from 'src/repositories/upazila.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DistrictRepository, UpazilaRepository])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
