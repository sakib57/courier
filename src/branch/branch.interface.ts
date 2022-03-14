import { Upazila } from 'src/entities/upazila.entity';

export interface IBranch {
  id: number;
  name: string;
  phone: string;
  address: string;
  upazila: Upazila;
}
