import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Branch } from './branch.entity';
import { Parcel } from './parcel.entity';
import { Store } from './store.entity';
import { PaymentRequest } from './payment-request.entity';
import { PickupRequest } from './pickup-request.entity';

@Entity()
export class Merchant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  permissions: string;

  @ManyToOne(() => Branch, (branch) => branch.merchants)
  @JoinColumn({
    name: 'branch_id',
  })
  branch: Branch;

  @OneToMany(() => Parcel, (parcel) => parcel.merchant)
  parcels: Parcel[];

  @OneToMany(() => PickupRequest, (pickupReq) => pickupReq.merchant)
  pickupReq: PickupRequest[];

  @OneToMany(() => Store, (store) => store.merchant)
  stores: Store[];

  @OneToMany(() => PaymentRequest, (paymentReq) => paymentReq.merchant)
  paymentRequest: PaymentRequest[];

  @Column({ default: 0 })
  wallet: number;

  @Column({ nullable: true })
  company_name: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  contact_number: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  nid_number: string;

  @Column({ nullable: true })
  passport_number: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  nid_f_image: string;

  @Column({ nullable: true })
  nid_b_image: string;

  @Column({ nullable: true })
  passport_image: string;

  @Column({ default: 0 })
  in_city_rate: number;

  @Column({ default: 0 })
  out_city_rate: number;

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

  @Column({ nullable: true })
  parent_merchant_id: number;

  @Column()
  salt: string;

  @Column({ default: true })
  isActive: boolean;

  async validateMerchantPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
