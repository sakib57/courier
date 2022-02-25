import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Rider } from 'src/entities/rider.entity';
import { RiderService } from './rider.service';

@ApiTags('Rider')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('rider')
export class RiderController {
  constructor(private riderService: RiderService) {}
  //   Merchant List
  @Get('list')
  merchantList(): Promise<Rider[]> {
    return this.riderService.riderList();
  }
}
