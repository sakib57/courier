import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Upazila } from './upazila.entity';

@Entity()
export class Road extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Upazila, (upazila) => upazila.roads)
  @JoinColumn({
    name: 'upazila_id',
  })
  upazila: Upazila;
}
