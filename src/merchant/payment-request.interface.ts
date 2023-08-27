import { Merchant } from 'src/entities/merchant.entity';

export interface IMerchantWallet {
  id: number;
  amount: number;
  merchant: Merchant;
}
