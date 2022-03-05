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
export class DeliveryParcel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Parcel, (parcel) => parcel.deliveryParcel)
  @JoinColumn()
  parcel: Parcel;

  @ManyToOne(() => Rider, (rider) => rider.delivery_parcels)
  @JoinColumn({
    name: 'rider_id',
  })
  rider: Rider;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
