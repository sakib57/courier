import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Branch } from './branch.entity';
import { DeliveryParcel } from './delivery-parcel.entity';
import { Merchant } from './merchant.entity';
import { PickupParcel } from './pickup-parcel.entity';
import { PaymentParcel } from './payment-parcel.entity';
import { ReturnParcel } from './return-parcel.entity';

export enum PickupStatus {
  PENDIGN = 'Pending',
  ASSIGNED = 'Assigned',
  SETOUT = 'Set Out',
  PICKED = 'Picked',
  STORED = 'Stored',
  CANCELLED = 'Cancelled',
}

export enum DeliveryStatus {
  PENDIGN = 'Pending',
  ASSIGNED = 'Assigned',
  SETOUT = 'Set Out',
  DELIVERED = 'Delivered',
  RETURNING = 'Returning',
  RETURNED = 'Returned',
  FAILED = 'Failed',
  RESTORED = 'Restored',
  CANCELLED = 'Cancelled',
}

@Entity()
export class Parcel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Merchant, (merchant) => merchant.parcels)
  @JoinColumn({
    name: 'merchant_id',
  })
  merchant: Merchant;

  @Column({ type: 'text', nullable: true })
  order_id: string;

  @ManyToOne(() => Branch, (branch) => branch.iparcels, { nullable: true })
  @JoinColumn({
    name: 'i_branch_id',
  })
  i_branch: Branch;

  @ManyToOne(() => Branch, (branch) => branch.dparcels, { nullable: true })
  @JoinColumn({
    name: 'd_branch_id',
  })
  d_branch: Branch;

  @Column({ type: 'text' })
  pickup_location: string;

  @Column({ nullable: true })
  customer_name: string;

  @Column({ nullable: true })
  customer_phone: string;

  @Column({ type: 'text', nullable: true })
  customer_district: string;

  @Column({ type: 'text', nullable: true })
  customer_upazila: string;

  @Column({ type: 'text', nullable: true })
  customer_road: string;

  @Column({ type: 'text', nullable: true })
  customer_address: string;

  @Column({ type: 'numeric', nullable: true })
  collect_amount: number;

  @Column({ type: 'numeric', nullable: true })
  product_cost_amount: number;

  @Column({ type: 'numeric', nullable: true })
  delivery_fees: number;

  @Column({ type: 'numeric', nullable: true })
  cod_fees: number;

  @Column({ type: 'numeric', nullable: true })
  discount: number;

  @Column({ type: 'numeric', nullable: true })
  promo_discount: number;

  @Column({ type: 'numeric', nullable: true })
  additional_charge: number;

  @Column({ type: 'numeric', nullable: true })
  compensation_cost: number;

  @Column({ type: 'numeric' })
  weight: number;

  @Column({ type: 'numeric', nullable: true })
  quantity: number;

  @Column({ type: 'text', nullable: true })
  item_description: string;

  @Column({ type: 'text', nullable: true })
  delivery_instruction: string;

  @Column({ type: 'enum', enum: PickupStatus, default: PickupStatus.PENDIGN })
  pickup_status: string;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    default: DeliveryStatus.PENDIGN,
  })
  delivery_status: string;

  @OneToOne(() => PickupParcel, (pickupParcel) => pickupParcel.parcel)
  pickupParcel: PickupParcel;

  @Column({ default: null })
  pickup_date: Date;

  @OneToOne(() => DeliveryParcel, (deliveryParcel) => deliveryParcel.parcel)
  deliveryParcel: DeliveryParcel;

  @Column({ default: null, nullable: true })
  delivery_date: Date;

  @OneToOne(() => ReturnParcel, (returnParcel) => returnParcel.parcel)
  returnParcel: ReturnParcel;

  @OneToMany(() => PaymentParcel, (paymentParcel) => paymentParcel.parcel)
  payment_parcel: PaymentParcel[];

  @Column({ default: false })
  isPaid: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
