import { Inject, Injectable } from "@nestjs/common";
import { RedisAbstractConnection } from "../../../../infrastructure/redis";
import { INFRASTRUCTURE_CONSTANTS } from "../constants";
import { IConfig } from "../../../../core/application";

@Injectable()
export class RedisConnection extends RedisAbstractConnection {
    constructor(
        @Inject(INFRASTRUCTURE_CONSTANTS.CONFIG) config: IConfig
    ) {
        super(
            config,
        );
    }
}