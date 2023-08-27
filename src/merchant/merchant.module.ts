import { Module } from '@nestjs/common';
import { ParcelModule } from 'src/parcel/parcel.module';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';

@Module({
  imports: [ParcelModule],
  controllers: [MerchantController],
  providers: [MerchantService],
})
export class MerchantModule {}
