import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Branch } from './branch.entity';
import { Upazila } from './upazila.entity';

@Entity()
export class District extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  name: string;

  @OneToMany(() => Upazila, (upazila) => upazila.district)
  upazilas: Upazila[];

  @OneToMany(() => Branch, (branch) => branch.district)
  branches: Branch[];
}
