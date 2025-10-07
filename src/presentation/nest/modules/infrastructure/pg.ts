import { Injectable } from "@nestjs/common";
import { TypeOrmAbstractConnection } from "../../../../infrastructure/postgres";

@Injectable()
export class PgConnection extends TypeOrmAbstractConnection {
    constructor() {
        super();
    }
}