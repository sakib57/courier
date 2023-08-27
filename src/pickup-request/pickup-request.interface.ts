import { Branch } from 'src/entities/branch.entity';
import { Merchant } from 'src/entities/merchant.entity';

export interface IPickupRequest {
  id: number;
  nerchant: Merchant;
  branch: Branch;
  status: string;
}
