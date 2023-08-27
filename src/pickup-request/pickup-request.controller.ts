import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchQueryDto } from 'src/common/search-query.dto';
import { PickupRequestUpdateDTO } from './dto/pickup-request-update.dto';
import { PickupRequestDTO } from './dto/pickup-request.dto';
import { PickupRequestService } from './pickup-request.service';

@ApiTags('Pickup Request')
@Controller('pickup-request')
export class PickupRequestController {
  constructor(private readonly pickupRequestService: PickupRequestService) {}

  @Post('create')
  create(@Body() pickupReqDto: PickupRequestDTO) {
    return this.pickupRequestService.create(pickupReqDto);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: number,
    @Body() pickupReqUpdateDto: PickupRequestUpdateDTO,
  ) {
    return this.pickupRequestService.update(id, pickupReqUpdateDto);
  }

  @Get('list')
  findAll(@Query() searchQueryDto: SearchQueryDto) {
    return this.pickupRequestService.findAll(searchQueryDto);
  }
}
