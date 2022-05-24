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
import { Merchant } from './merchant.entity';
import { Parcel } from './parcel.entity';

@Entity()
export class MerchantWallet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Parcel, (parcel) => parcel.merchantWallet)
  @JoinColumn()
  parcel: Parcel;

  @ManyToOne(() => Merchant, (merchant) => merchant.merchantWallets)
  @JoinColumn({
    name: 'merchant_id',
  })
  merchant: Merchant;

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
