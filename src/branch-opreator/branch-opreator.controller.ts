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
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ChangePasswordDto } from 'src/common/change-password.dto';
import { SearchQueryDto } from 'src/common/search-query.dto';
import { UpdateOperatorDTO } from './branch-operator-update.dto';
import { IBranchOperator } from './branch-operator.interface';
import { BranchOpreatorService } from './branch-opreator.service';
import { CreateOperatorDTO } from './create-branch-operator.dto';

@ApiTags('Branch')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('branch')
export class BranchOpreatorController {
  constructor(private operatorService: BranchOpreatorService) {}

  @Post('operator/create')
  operatorCreate(
    @Body(ValidationPipe) createOperatorDto: CreateOperatorDTO,
  ): Promise<IBranchOperator> {
    return this.operatorService.operatorCreate(createOperatorDto);
  }

  @Patch('operator/update/:id')
  operatorUpdate(
    @Param('id') id: number,
    @Body(ValidationPipe) updateOperatorDto: UpdateOperatorDTO,
  ): Promise<IBranchOperator> {
    return this.operatorService.operatorUpdate(id, updateOperatorDto);
  }

  @Get('operator/list')
  operatorList(
    @Query() searchQueryDto: SearchQueryDto,
  ): Promise<IBranchOperator[]> {
    return this.operatorService.operatorList(searchQueryDto);
  }

  @Delete('operator/delete/:id')
  operatorDelete(@Param('id') id: number): Promise<any> {
    return this.operatorService.operatorDelete(id);
  }

  @Get('operator/:id')
  operatorFind(@Param('id') id: number): Promise<IBranchOperator> {
    return this.operatorService.operatorFind(id);
  }

  // Change Password
  @Post('operator/change-password/:id')
  changePassword(
    @Param('id') id,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ) {
    return this.operatorService.changePassword(id, changePasswordDto);
  }
}
