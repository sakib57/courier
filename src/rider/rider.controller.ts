import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Parcel } from 'src/entities/parcel.entity';
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
  //   Rider List
  @Get('list')
  merchantList(): Promise<Rider[]> {
    return this.riderService.riderList();
  }

  // Rider's pickup parcels
  @Get(':rider_id/pickup-parcel-list')
  ridersPickupParcels(
    @Param('rider_id') rider_id,
    @Query() query,
  ): Promise<Parcel[]> {
    return this.riderService.ridersPickupParcels(rider_id, query);
  }
}
