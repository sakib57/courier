import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Branch } from './branch.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class BranchOperator extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @ManyToOne(() => Branch, (branch) => branch.branch_operators)
  @JoinColumn({
    name: 'branch_id',
  })
  branch: Branch;

  @Column({ default: false })
  isManager: boolean;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  permissions: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: true })
  isActive: boolean;

  async validateBranchOperatorPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
