import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from 'src/entities/payment-request.entity';

export class UpdatePaymentRequestDto {
  @ApiProperty({ enum: PaymentStatus })
  payment_status: PaymentStatus;
}
