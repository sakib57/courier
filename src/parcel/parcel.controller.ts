import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Parcel } from 'src/entities/parcel.entity';
import { ParcelDto } from './parcel.dto';
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
  @Get('pickup-list')
  parcelList(@Query() branch_id): Promise<Parcel[]> {
    return this.parcelService.parcelList(branch_id);
  }

  //   Parcel req create
  @Post('create')
  createParcelReq(@Body(ValidationPipe) parcelDto: ParcelDto) {
    return this.parcelService.createParcelReq(parcelDto);
  }

  // Find Parcel
  @Get(':id')
  parcel(@Param() id: number): Promise<Parcel> {
    return this.parcelService.parcel(id);
  }
}
