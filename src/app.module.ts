import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { BranchModule } from './branch/branch.module';
import { AppController } from './app.controller';
import { MerchantModule } from './merchant/merchant.module';
import { RiderModule } from './rider/rider.module';
import { ParcelModule } from './parcel/parcel.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    AdminModule,
    BranchModule,
    MerchantModule,
    RiderModule,
    ParcelModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
