import { Request } from 'express';

export interface AccountDto {
  id: string;
  login: string;
}

export interface ExtendRequest extends Request {
  account: AccountDto;
}
