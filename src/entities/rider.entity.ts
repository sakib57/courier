import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Branch } from './branch.entity';
import { PickupParcel } from './pickup-parcel.entity';
import { DeliveryParcel } from './delivery-parcel.entity';

@Entity()
export class Rider extends User {
  @ManyToOne(() => Branch, (branch) => branch.merchants)
  @JoinColumn({
    name: 'branch_id',
  })
  branch: Branch;

  @Column({ type: 'text' })
  address: string;

  @Column()
  contact_number: string;

  @OneToMany(() => PickupParcel, (pickup_parcel) => pickup_parcel.rider)
  pickup_parcels: PickupParcel[];

  @OneToMany(() => DeliveryParcel, (delivery_parcel) => delivery_parcel.rider)
  delivery_parcels: DeliveryParcel[];

  @Column()
  isActive: boolean;

  @Column()
  salt: string;

  async validateRiderPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
