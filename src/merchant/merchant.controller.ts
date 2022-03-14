import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Parcel, PickupStatus } from 'src/entities/parcel.entity';
import { ParcelService } from 'src/parcel/parcel.service';
import { IMerchant } from './merchant.interface';
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
  constructor(
    private merchantService: MerchantService,
    private parcelService: ParcelService,
  ) {}

  //   Merchant List
  @Get('list')
  merchantList(): Promise<IMerchant[]> {
    return this.merchantService.merchantList();
  }

  // Pickup Parcel List
  @Get('pickup-parcel-list/:merchant_id')
  parcelPickupList(
    @Param() merchant_id: number,
    @Query() query: PickupStatus,
  ): Promise<Parcel[]> {
    return this.parcelService.merchantsPickupParcelList(merchant_id, query);
  }

  // Delivery Parcel List
  @Get('delivery-parcel-list/:merchant_id')
  parceDeliverylList(
    @Param() merchant_id: number,
    @Query() query: PickupStatus,
  ): Promise<Parcel[]> {
    return this.parcelService.merchantsDeliveryParcelList(merchant_id, query);
  }
}
