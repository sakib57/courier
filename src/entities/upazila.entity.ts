import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Branch } from './branch.entity';
import { District } from './district.entity';

@Entity()
export class Upazila extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => District, (district) => district.upazilas)
  @JoinColumn({
    name: 'district_id',
  })
  district: District;

  @OneToMany(() => Branch, (branch) => branch.upazila)
  branches: Branch[];
}
