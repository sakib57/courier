import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Merchant } from 'src/entities/merchant.entity';
import { MerchantService } from './merchant.service';

@ApiTags('Merchant')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('merchant')
export class MerchantController {
  constructor(private merchantService: MerchantService) {}

  //   Merchant List
  @Get('list')
  merchantList(): Promise<Merchant[]> {
    return this.merchantService.merchantList();
  }
}
