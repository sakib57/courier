import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Merchant } from './merchant.entity';
import { PaymentParcel } from './payment-parcel.entity';
import { Branch } from './branch.entity';

export enum PaymentStatus {
  REQUESTED = 'Requested',
  IN_PROGRESS = 'InProgress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

@Entity()
export class PaymentRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Merchant, (merchant) => merchant.paymentRequest)
  @JoinColumn({
    name: 'merchant_id',
  })
  merchant: Merchant;

  @ManyToOne(() => Branch, (branch) => branch.paymentRequest)
  @JoinColumn({
    name: 'branch_id',
  })
  branch: Branch;

  @Column({ nullable: true })
  bank_name: string;

  @Column({ nullable: true })
  bank_branch: string;

  @Column({ nullable: true })
  bank_acc_name: string;

  @Column({ nullable: true })
  bank_acc_no: string;

  @Column({ nullable: true })
  bank_routing_no: string;

  @Column({ nullable: true })
  bkash_no: string;

  @Column()
  collect_amount_sum: number;

  @Column()
  product_amount_sum: number;

  @Column()
  delivery_charge_sum: number;

  @OneToMany(() => PaymentParcel, (paymentParcel) => paymentParcel.paymentReq)
  payment_parcel: PaymentParcel[];

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.REQUESTED,
  })
  payment_status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
