import { IBranch } from 'src/branch/branch.interface';

export interface IBranchOperator {
  id: number;
  name: string;
  email: string;
  branch: IBranch;
  image: string;
}
