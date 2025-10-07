import { CreateAccountDto } from "../dto";
import { Account } from "../entities";

export interface IRegistrationCommand {
    execute(dto: CreateAccountDto): Promise<Account>;
}