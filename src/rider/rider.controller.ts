import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from 'src/common/change-password.dto';
import { SearchQueryDto } from 'src/common/search-query.dto';
import { Parcel } from 'src/entities/parcel.entity';
import { Ride } from 'src/entities/ride.entity';
import { RideDto } from './ride.dto';
import { RiderUpdateDto } from './rider-update.dto';
import { IRider } from './rider.interface';
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
  riderList(@Query() searchQueryDto: SearchQueryDto): Promise<IRider[]> {
    return this.riderService.riderList(searchQueryDto);
  }

  // Riders profile
  @Get('profile/:id')
  ridersProfile(@Param('id') id): Promise<IRider> {
    return this.riderService.riderProfile(id);
  }

  // Riders profile update
  @Patch('profile/update/:id')
  ridersProfileUpdate(
    @Param('id') id,
    @Body() riderUpdateDto: RiderUpdateDto,
  ): Promise<IRider> {
    return this.riderService.riderProfileUpdate(id, riderUpdateDto);
  }

  // Ride Create
  @Post('ride/create')
  rideCreate(@Body() rideDto: RideDto) {
    return this.riderService.createRide(rideDto);
  }

  // Ride list
  @Get('ride/list/:rider_id')
  rideList(@Param('rider_id') rider_id): Promise<Ride[]> {
    return this.riderService.rideList(rider_id);
  }

  // Rider's pickup parcels
  @Get(':rider_id/pickup-parcel-list')
  ridersPickupParcels(
    @Param('rider_id') rider_id,
    @Query() query,
  ): Promise<Parcel[]> {
    return this.riderService.ridersPickupParcels(rider_id, query);
  }

  // Rider's delivery parcels
  @Get(':rider_id/delivery-parcel-list')
  ridersDliveryParcels(
    @Param('rider_id') rider_id,
    @Query() query,
  ): Promise<Parcel[]> {
    return this.riderService.ridersDeliveryParcels(rider_id, query);
  }

  // Change Password
  @Post('change-password/:id')
  changePassword(
    @Param('id') id,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ) {
    return this.riderService.changePassword(id, changePasswordDto);
  }

  @Get('count')
  branchCount() {
    return this.riderService.count();
  }

  // Dashboard
  @Get('dashboard/:rider_id')
  dashboard(@Param() param: number, @Query() query: any) {
    return this.riderService.riderDashboard(param, query);
  }
}
