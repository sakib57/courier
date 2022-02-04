import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiderController } from './rider.controller';
import { RiderRepository } from './rider.repository';
import { RiderService } from './rider.service';

@Module({
  imports: [TypeOrmModule.forFeature([RiderRepository])],
  controllers: [RiderController],
  providers: [RiderService],
})
export class RiderModule {}
