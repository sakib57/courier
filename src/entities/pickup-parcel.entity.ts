import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Parcel } from './parcel.entity';
import { Rider } from './rider.entity';

@Entity()
export class PickupParcel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Parcel)
  @JoinColumn()
  parcel: Parcel;

  @ManyToOne(() => Rider, (rider) => rider.pickup_parcels)
  @JoinColumn({
    name: 'rider_id',
  })
  rider: Rider;
}
