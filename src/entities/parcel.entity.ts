import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Branch } from './branch.entity';
import { DeliveryParcel } from './delivery-parcel.entity';
import { MerchantWallet } from './merchant-wallet.entity';
import { Merchant } from './merchant.entity';
import { PickupParcel } from './pickup-parcel.entity';

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
  FAILED = 'Failed',
  RESTORED = 'Restored',
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

  @ManyToOne(() => Branch, (branch) => branch.parcels, { nullable: true })
  @JoinColumn({
    name: 'd_branch_id',
  })
  d_branch: Branch;

  @Column({ type: 'text' })
  pickup_location: string;

  @Column()
  customer_name: string;

  @Column()
  customer_phone: string;

  @Column({ type: 'text' })
  customer_address: string;

  @Column({ type: 'numeric' })
  collect_amount: number;

  @Column()
  weight: number;

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

  @Column({ default: null })
  delivery_date: Date;

  @OneToOne(() => MerchantWallet, (merchantWallet) => merchantWallet.parcel)
  merchantWallet: MerchantWallet;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
