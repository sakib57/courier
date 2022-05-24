import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Branch } from './branch.entity';
import { Parcel } from './parcel.entity';
import { MerchantWallet } from './merchant-wallet.entity';

@Entity()
export class Merchant extends User {
  @ManyToOne(() => Branch, (branch) => branch.merchants)
  @JoinColumn({
    name: 'branch_id',
  })
  branch: Branch;

  @OneToMany(() => Parcel, (parcel) => parcel.merchant)
  parcels: Parcel[];

  @OneToMany(() => MerchantWallet, (merchantWallet) => merchantWallet.merchant)
  merchantWallets: MerchantWallet[];

  @Column()
  company_name: string;

  @Column({ type: 'text' })
  address: string;

  @Column()
  contact_number: string;

  @Column({ default: 0 })
  in_city_rate: number;

  @Column({ default: 0 })
  out_city_rate: number;

  @Column()
  salt: string;

  async validateMerchantPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
