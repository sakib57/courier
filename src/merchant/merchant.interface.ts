import { Branch } from 'src/entities/branch.entity';

export interface IMerchant {
  id: number;
  name: string;
  email: string;
  company_name: string;
  address: string;
  contact_number: string;
  parent_merchant_id: any;
  permissions: string;
  branch: Branch;
  isActive: boolean;
}
