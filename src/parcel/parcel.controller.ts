import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Parcel } from 'src/entities/parcel.entity';
import { UpdateDeliveryStatusDto, UpdatePickupStatusDto } from './dto';
import { ParcelDto } from './dto/parcel.dto';
import { ParcelUpdateDto } from './dto/parcel.update.dto';
import { ParcelService } from './parcel.service';
import { XlsxParcelDTO } from './dto/xlsx-parcel.dto';
import PermissionGuard from 'src/auth/guards/role.guard';
import Permission from 'src/permission/permission.type';

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
  // @UseGuards(PermissionGuard(Permission.CreateParcel))
  @Post('create')
  createParcelReq(@Body(ValidationPipe) parcelDto: ParcelDto) {
    return this.parcelService.createParcelReq(parcelDto);
  }

  // Parcel req create
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './temp',
        filename: (req, file, cb) => {
          const fileName = 'import';
          const extension = '.xlsx';
          cb(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  @Post('create/xlsx')
  createParcelReqXlsx(
    @Body(ValidationPipe) xlsxParcelDTO: XlsxParcelDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    xlsxParcelDTO.file = file.path;
    return this.parcelService.createParcelReqXlsx(xlsxParcelDTO);
  }

  // Parcel req create
  @UseGuards(PermissionGuard(Permission.UpdateParcel))
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
