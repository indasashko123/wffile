import { Account } from "../entities";

export interface IAccountRepository {
    getById (id: string): Promise<Account | null>;
    getByLogin(login: string): Promise<Account | null>;
}