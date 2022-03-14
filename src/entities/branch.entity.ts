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

@Entity()
export class Branch extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  user_email: string;

  @Column()
  user_password: string;

  @Column()
  salt: string;

  @Column()
  phone: string;

  @Column({ type: 'text' })
  address: string;

  @OneToMany(() => Merchant, (merchant) => merchant.branch)
  merchants: Merchant[];

  @ManyToOne(() => Upazila, (upazila) => upazila.branches)
  @JoinColumn({
    name: 'upazila_id',
  })
  upazila: Upazila;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  async validateBranchPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.user_password;
  }
}
