import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Parcel } from './parcel.entity';
import { PaymentRequest } from './payment-request.entity';

@Entity()
export class PaymentParcel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PaymentRequest, (paymentReq) => paymentReq.payment_parcel)
  @JoinColumn({
    name: 'payment_request_id',
  })
  paymentReq: PaymentRequest;

  @ManyToOne(() => Parcel, (parcel) => parcel.payment_parcel)
  @JoinColumn({
    name: 'parcel_id',
  })
  parcel: Parcel;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
