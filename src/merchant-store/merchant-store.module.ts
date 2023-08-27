import { Module } from '@nestjs/common';
import { MerchantStoreService } from './merchant-store.service';
import { MerchantStoreController } from './merchant-store.controller';

@Module({
  providers: [MerchantStoreService],
  controllers: [MerchantStoreController],
})
export class MerchantStoreModule {}
