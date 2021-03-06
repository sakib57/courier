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
import { Parcel, PickupStatus } from 'src/entities/parcel.entity';
import { ParcelService } from 'src/parcel/parcel.service';
import { MerchantUpdateDto } from './merchant-update.dto';
import { IMerchantWallet } from './merchant-wallet.interface';
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
  merchantList(@Query() searchQueryDto: SearchQueryDto): Promise<IMerchant[]> {
    return this.merchantService.merchantList(searchQueryDto);
  }

  // Merchants profile
  @Get('profile/:id')
  merchantProfile(@Param('id') id): Promise<IMerchant> {
    return this.merchantService.merchantProfile(id);
  }

  // Merchants profile
  @Get('wallet/:id')
  merchantWallet(@Param('id') id): Promise<IMerchantWallet[]> {
    return this.merchantService.merchantWallet(id);
  }

  // Merchants profile update
  @Patch('profile/update/:id')
  merchantProfileUpdate(
    @Param('id') id,
    @Body() merchantUpdateDto: MerchantUpdateDto,
  ): Promise<IMerchant> {
    return this.merchantService.merchantProfileUpdate(id, merchantUpdateDto);
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

  // Change Password
  @Post('change-password/:id')
  changePassword(
    @Param('id') id,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ) {
    return this.merchantService.changePassword(id, changePasswordDto);
  }
}
