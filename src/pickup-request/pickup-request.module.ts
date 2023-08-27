import { Module } from '@nestjs/common';
import { PickupRequestService } from './pickup-request.service';
import { PickupRequestController } from './pickup-request.controller';

@Module({
  providers: [PickupRequestService],
  controllers: [PickupRequestController]
})
export class PickupRequestModule {}
