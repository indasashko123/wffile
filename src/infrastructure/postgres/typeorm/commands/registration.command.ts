import { CommonError } from "../../../../core/application";
import { Account, CreateAccountDto, IRegistrationCommand } from "../../../../core/domain/auth";
import { AccountModel } from "../models/account.model";
import { TypeOrmAbstractConnection } from "../connection";


export abstract class RegistrationAbstractCommand implements IRegistrationCommand {

    constructor(
        private readonly typeOrmConnection: TypeOrmAbstractConnection
    ) {

    }

    async execute(dto: CreateAccountDto): Promise<Account> {
        const runner = this.typeOrmConnection.getClient().createQueryRunner();
        await runner.startTransaction();

        try {
            const candidate = await runner.manager.findOne(AccountModel, {where : {
                login: dto.login
            }});
            if(candidate) {
                CommonError.BadRequest('login used');
            }
            const account = new AccountModel({
                login: dto.login,
                password: dto.password
            });
             const savedAccount = await runner.manager.save(account);
             await runner.commitTransaction();
            return account;
        } catch (error) {
            await runner.rollbackTransaction();
            throw error;
        } finally {
            await runner.release();
        } 
    }

}