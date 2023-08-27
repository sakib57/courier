import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Branch } from './branch.entity';
import { Merchant } from './merchant.entity';
import { Rider } from './rider.entity';

export enum PickupReqStatus {
  REQUESTED = 'Requested',
  ACCEPTED = 'Accepted',
  STORED = 'Stored',
  CANCELLED = 'Cancelled',
}

@Entity()
export class PickupRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Merchant, (merchant) => merchant.pickupReq)
  @JoinColumn({
    name: 'merchant_id',
  })
  merchant: Merchant;

  @ManyToOne(() => Branch, (branch) => branch.pickupReq, { nullable: true })
  @JoinColumn({
    name: 'branch_id',
  })
  branch: Branch;

  @ManyToOne(() => Rider, (rider) => rider.pickupReq, { nullable: true })
  @JoinColumn({
    name: 'rider_id',
  })
  rider: Rider;

  @Column({ nullable: true })
  parcel_count: number;

  @Column({ type: 'text' })
  @IsNotEmpty()
  pickup_location: string;

  @Column()
  weight: string;

  @Column({
    type: 'enum',
    enum: PickupReqStatus,
    default: PickupReqStatus.REQUESTED,
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
