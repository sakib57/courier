import { Module } from '@nestjs/common';
import { ParcelService } from './parcel.service';
import { ParcelController } from './parcel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParcelRepository } from './parcel.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ParcelRepository])],
  providers: [ParcelService],
  controllers: [ParcelController],
})
export class ParcelModule {}
