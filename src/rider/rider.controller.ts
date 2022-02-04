import { Controller, Get } from '@nestjs/common';
import { Rider } from 'src/entities/rider.entity';
import { RiderService } from './rider.service';

@Controller('rider')
export class RiderController {
  constructor(private riderService: RiderService) {}
  //   Merchant List
  @Get('list')
  merchantList(): Promise<Rider[]> {
    return this.riderService.riderList();
  }
}
