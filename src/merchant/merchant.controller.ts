import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from 'src/common/change-password.dto';
import { SearchQueryDto } from 'src/common/search-query.dto';
import { Parcel, PickupStatus } from 'src/entities/parcel.entity';
import { ParcelService } from 'src/parcel/parcel.service';
import { MerchantUpdateDto } from './merchant-update.dto';
import { IMerchant } from './merchant.interface';
import { MerchantService } from './merchant.service';
import { PaymentRequestDto } from './payment-request.dto';
import { UpdatePaymentRequestDto } from './update-payment-request.dto';
import PermissionGuard from 'src/auth/guards/role.guard';
import Permission from 'src/permission/permission.type';

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

  // Merchants profile update
  @Patch('profile/update/:id')
  merchantProfileUpdate(
    @Param('id') id,
    @Body(ValidationPipe) merchantUpdateDto: MerchantUpdateDto,
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

  // Create Payment Request
  @UseGuards(PermissionGuard(Permission.PaymentRerquest))
  @Post('payment-request')
  paymentRequest(@Body() paymentRequestDto: PaymentRequestDto): Promise<any> {
    return this.merchantService.merchantPaymentRequest(paymentRequestDto);
  }

  // Update Payment Request
  @Patch('payment-request/:id')
  updatePaymentRequest(
    @Param('id') id: number,
    @Body() updatePaymentRequestDto: UpdatePaymentRequestDto,
  ): Promise<any> {
    return this.merchantService.merchantPaymentRequestUpdate(
      id,
      updatePaymentRequestDto,
    );
  }

  // Merchant Delete
  @Delete('delete/:id')
  delete(@Param('id') id) {
    return this.merchantService.merchantDelete(id);
  }

  // Change Password
  @Post('change-password/:id')
  changePassword(
    @Param('id') id,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ) {
    return this.merchantService.changePassword(id, changePasswordDto);
  }

  @Get('count')
  branchCount() {
    return this.merchantService.count();
  }
}
