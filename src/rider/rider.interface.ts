import { Branch } from 'src/entities/branch.entity';

export interface IRider {
  id: number;
  name: string;
  email: string;
  address: string;
  contact_number: string;
  isActive: boolean;
  image: string;
  branch: Branch;
}
