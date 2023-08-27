import * as bcrypt from 'bcrypt';

// Password hash
export async function hashPassword(
  password: string,
  salt: string,
): Promise<string> {
  return bcrypt.hash(password, salt);
}

export enum UserType {
  MERCHANT = 'MERCHANT',
  RIDER = 'RIDER',
  ADMIN = 'ADMIN',
  BRANCH_OPERATOR = 'BRANCH_OPERATOR',
}
