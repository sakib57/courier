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

@Entity()
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Merchant, (merchant) => merchant.stores)
  @JoinColumn({
    name: 'merchant_id',
  })
  merchant: Merchant;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  pickup_address: string;

  @Column({ type: 'text' })
  return_address: string;

  @Column({ type: 'text' })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
