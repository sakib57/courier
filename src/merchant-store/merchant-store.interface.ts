import { Merchant } from 'src/entities/merchant.entity';

export interface IMerchantStore {
  id: number;
  merchant: Merchant;
  name: string;
  pickup_address: string;
  return_address: string;
  status: string;
}
