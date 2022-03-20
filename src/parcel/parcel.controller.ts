import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Parcel } from 'src/entities/parcel.entity';
import { UpdateDeliveryStatusDto, UpdatePickupStatusDto } from './dto';
import { ParcelDto } from './dto/parcel.dto';
import { ParcelUpdateDto } from './dto/parcel.update.dto';
import { ParcelService } from './parcel.service';

@ApiTags('Parcel')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('parcel')
export class ParcelController {
  constructor(private parcelService: ParcelService) {}

  // Parcel List
  // @Get('pickup-list')
  // parcelList(@Query() branch_id): Promise<Parcel[]> {
  //   return this.parcelService.parcelList(branch_id);
  // }

  // Parcel req create
  @Post('create')
  createParcelReq(@Body(ValidationPipe) parcelDto: ParcelDto) {
    return this.parcelService.createParcelReq(parcelDto);
  }

  // Parcel req create
  @Patch('update/:id')
  updateParcelReq(
    @Param('id') id,
    @Body(ValidationPipe) parcelUpdateDto: ParcelUpdateDto,
  ) {
    return this.parcelService.updateParcelReq(id, parcelUpdateDto);
  }

  // Update parcel pickup status
  @Patch('update-pickup-status/:parcel_id')
  updatePickpuStatus(
    @Param('parcel_id') parcel_id,
    @Body(ValidationPipe) updatePickupStatusDto: UpdatePickupStatusDto,
  ) {
    return this.parcelService.updateParcelPickupStatus(
      parcel_id,
      updatePickupStatusDto,
    );
  }

  // Update parcel delivery status
  @Patch('update-delivery-status/:parcel_id')
  updateDeliveryStatus(
    @Param('parcel_id') parcel_id,
    @Body(ValidationPipe) updateDeliveryStatusDto: UpdateDeliveryStatusDto,
  ) {
    return this.parcelService.updateParcelDeliveryStatus(
      parcel_id,
      updateDeliveryStatusDto,
    );
  }

  // Find Parcel
  @Get(':id')
  parcel(@Param() id: number): Promise<Parcel> {
    return this.parcelService.parcel(id);
  }
}
