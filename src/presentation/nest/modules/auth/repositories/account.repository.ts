import { AccountAbstractRepository } from "../../../../../infrastructure/postgres";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccountRepository extends AccountAbstractRepository {
    constructor() {
        super();
    }
}