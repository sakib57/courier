import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParcelModule } from 'src/parcel/parcel.module';
import { MerchantController } from './merchant.controller';
import { MerchantRepository } from './merchant.repository';
import { MerchantService } from './merchant.service';

@Module({
  imports: [TypeOrmModule.forFeature([MerchantRepository]), ParcelModule],
  controllers: [MerchantController],
  providers: [MerchantService],
})
export class MerchantModule {}
