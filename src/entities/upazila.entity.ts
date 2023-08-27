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
import { Road } from './road.entity';

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

  @OneToMany(() => Road, (roads) => roads.upazila)
  roads: Road[];
}
