import { Merchant } from 'src/entities/merchant.entity';
import { Parcel } from 'src/entities/parcel.entity';

export interface IMerchantWallet {
  id: number;
  amount: number;
  parcel: Parcel;
  merchant: Merchant;
}
