import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Parcel } from './parcel.entity';
import { Rider } from './rider.entity';

@Entity()
export class PickupParcel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Parcel, (parcel) => parcel.pickupParcel)
  @JoinColumn()
  parcel: Parcel;

  @ManyToOne(() => Rider, (rider) => rider.pickup_parcels)
  @JoinColumn({
    name: 'rider_id',
  })
  rider: Rider;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
