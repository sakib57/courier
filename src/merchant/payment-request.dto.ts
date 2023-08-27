import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaymentRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  branch: number;

  @ApiProperty()
  @IsNotEmpty()
  merchant: number;

  @ApiProperty()
  bank_name: string;

  @ApiProperty()
  bank_branch: string;

  @ApiProperty()
  bank_acc_name: string;

  @ApiProperty()
  bank_acc_no: string;

  @ApiProperty()
  bank_routing_no: string;

  @ApiProperty()
  bkash_no: string;
}
