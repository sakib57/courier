import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Merchant } from './merchant.entity';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
