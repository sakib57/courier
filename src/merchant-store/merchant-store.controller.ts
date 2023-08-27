import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { MerchantStoreService } from './merchant-store.service';
import { IMerchantStore } from './merchant-store.interface';
import { StoreDto } from './dto/merchant-store.dto';
import { StoreUpdateDto } from './dto/merchant-store-update.dto';

@ApiTags('Merchant')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('merchant-store')
export class MerchantStoreController {
  constructor(private storeService: MerchantStoreService) {}

  // Store create
  @Post('create')
  createParcelReq(@Body(ValidationPipe) parcelDto: StoreDto) {
    return this.storeService.createStore(parcelDto);
  }

  // Store create
  @Patch('update/:id')
  updateParcelReq(
    @Param('id') id,
    @Body(ValidationPipe) storeUpdateDto: StoreUpdateDto,
  ) {
    return this.storeService.updateStore(id, storeUpdateDto);
  }

  //   Store List
  @Get(':id')
  findStore(@Param('id') id): Promise<IMerchantStore> {
    return this.storeService.findOne(id);
  }

  //   Store List
  @Get('list/:merchant_id')
  storeList(@Param('merchant_id') merchant_id): Promise<IMerchantStore[]> {
    return this.storeService.findAll(merchant_id);
  }

  //   Store List
  @Delete('delete/:id')
  deleteStore(@Param('id') id): Promise<any> {
    return this.storeService.delete(id);
  }
}
