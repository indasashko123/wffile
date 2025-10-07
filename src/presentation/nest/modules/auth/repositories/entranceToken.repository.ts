import { Inject, Injectable } from "@nestjs/common";
import { EntranceTokenAbstractRepository, RedisAbstractConnection } from "../../../../../infrastructure/redis";
import { INFRASTRUCTURE_CONSTANTS } from "../../constants";
import { IConfig } from "../../../../../core/application";

@Injectable()
export class EntranceTokenRepository extends EntranceTokenAbstractRepository {
    constructor(
        @Inject(INFRASTRUCTURE_CONSTANTS.REDIS) redis: RedisAbstractConnection,
        @Inject(INFRASTRUCTURE_CONSTANTS.CONFIG) config: IConfig
   ) {
        super(
            redis,
            config
        );
    }
}