import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
}
