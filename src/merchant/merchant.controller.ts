import { Controller, Get } from '@nestjs/common';
import { Merchant } from 'src/entities/merchant.entity';
import { MerchantService } from './merchant.service';

@Controller('merchant')
export class MerchantController {
  constructor(private merchantService: MerchantService) {}

  //   Merchant List
  @Get('list')
  merchantList(): Promise<Merchant[]> {
    return this.merchantService.merchantList();
  }
}
