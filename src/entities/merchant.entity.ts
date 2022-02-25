import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Branch } from './branch.entity';
import { Parcel } from './parcel.entity';

@Entity()
export class Merchant extends User {
  @ManyToOne(() => Branch, (branch) => branch.merchants)
  @JoinColumn({
    name: 'branch_id',
  })
  branch: Branch;

  @OneToMany(() => Parcel, (parcel) => parcel.merchant)
  parcels: Parcel[];

  @Column()
  company_name: string;

  @Column({ type: 'text' })
  address: string;

  @Column()
  contact_number: string;

  @Column()
  salt: string;

  async validateMerchantPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
