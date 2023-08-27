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
import * as bcrypt from 'bcrypt';
import { Upazila } from './upazila.entity';
import { Parcel } from './parcel.entity';
import { PaymentRequest } from './payment-request.entity';
import { Rider } from './rider.entity';
import { BranchOperator } from './branch-operator.entity';
import { District } from './district.entity';
import { PickupRequest } from './pickup-request.entity';

@Entity()
export class Branch extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  phone: string;

  @Column({ type: 'text' })
  address: string;

  @OneToMany(() => Parcel, (parcel) => parcel.i_branch)
  iparcels: Parcel[];

  @OneToMany(() => Parcel, (parcel) => parcel.d_branch)
  dparcels: Parcel[];

  @OneToMany(() => Merchant, (merchant) => merchant.branch)
  merchants: Merchant[];

  @OneToMany(() => Rider, (rider) => rider.branch)
  riders: Rider[];

  @OneToMany(() => BranchOperator, (branch_operator) => branch_operator.branch)
  branch_operators: Parcel[];

  @OneToMany(() => PickupRequest, (pickupReq) => pickupReq.branch)
  pickupReq: PickupRequest[];

  @OneToMany(() => PaymentRequest, (paymentReq) => paymentReq.branch)
  paymentRequest: PaymentRequest[];

  @ManyToOne(() => District, (district) => district.branches)
  @JoinColumn({
    name: 'district_id',
  })
  district: District;

  @Column({ nullable: true })
  image: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
