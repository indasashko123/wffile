import { Inject, Injectable } from "@nestjs/common";
import { RegistrationAbstractCommand,TypeOrmAbstractConnection } from "../../../../../infrastructure/postgres/typeorm/";
import { INFRASTRUCTURE_CONSTANTS } from "../../constants";


@Injectable()
export class RegistrationCommand extends RegistrationAbstractCommand {
    constructor (
        @Inject(INFRASTRUCTURE_CONSTANTS.PG) pg: TypeOrmAbstractConnection
    ) {
        super(pg);
    }
}