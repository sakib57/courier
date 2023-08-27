import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rider } from './rider.entity';

@Entity()
export class Ride extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Rider, (rider) => rider.rides)
  @JoinColumn({
    name: 'rider_id',
  })
  rider: Rider;

  @Column()
  parcel_count: number;

  @CreateDateColumn()
  created_at: Date;
}
