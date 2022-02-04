import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Merchant } from './merchant.entity';

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

  @OneToMany(() => Merchant, (merchant) => merchant.branch)
  merchants: Merchant[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
