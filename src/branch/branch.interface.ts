import { District } from 'src/entities/district.entity';

export interface IBranch {
  id: number;
  name: string;
  phone: string;
  address: string;
  district: District;
  image: string;
}
