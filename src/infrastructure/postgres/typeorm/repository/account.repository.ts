import { Account, IAccountRepository } from '../../../../core/domain/auth';
import { AccountModel } from '../models/account.model';

export abstract class AccountAbstractRepository implements IAccountRepository {
  async getById(id: string): Promise<Account | null> {
    return await AccountModel.findOne({where: {
      id: id
    }});
  }
  async getByLogin(login: string): Promise<Account | null> {
    return await AccountModel.findOne({where : {
        login: login
    }});
  }
}
