import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Branch } from './branch.entity';
import { PickupParcel } from './pickup-parcel.entity';
import { DeliveryParcel } from './delivery-parcel.entity';
import { Ride } from './ride.entity';
import { PickupRequest } from './pickup-request.entity';
import { ReturnParcel } from './return-parcel.entity';

@Entity()
export class Rider extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  permissions: string;

  @ManyToOne(() => Branch, (branch) => branch.riders)
  @JoinColumn({
    name: 'branch_id',
  })
  branch: Branch;

  @OneToMany(() => Ride, (ride) => ride.rider)
  rides: Ride[];

  @Column({ type: 'text' })
  address: string;

  @Column()
  contact_number: string;

  @OneToMany(() => PickupParcel, (pickup_parcel) => pickup_parcel.rider)
  pickup_parcels: PickupParcel[];

  @OneToMany(() => PickupRequest, (pickupReq) => pickupReq.rider)
  pickupReq: PickupRequest[];

  @OneToMany(() => DeliveryParcel, (delivery_parcel) => delivery_parcel.rider)
  delivery_parcels: DeliveryParcel[];

  @OneToMany(() => ReturnParcel, (returnParcels) => returnParcels.rider)
  returnParcels: ReturnParcel[];

  @Column({ nullable: true })
  image: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  salt: string;

  async validateRiderPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
