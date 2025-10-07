import { Module } from "@nestjs/common";
import { INFRASTRUCTURE_CONSTANTS } from "../constants";
import { ConfigService } from "./config";
import { PgConnection } from "./pg";
import { RedisConnection } from "./redis";



@Module({
    providers: [
        {provide: INFRASTRUCTURE_CONSTANTS.CONFIG, useClass: ConfigService},
        {provide: INFRASTRUCTURE_CONSTANTS.PG, useClass: PgConnection},
        {provide: INFRASTRUCTURE_CONSTANTS.REDIS, useClass: RedisConnection},
    ],
    exports: [
        INFRASTRUCTURE_CONSTANTS.CONFIG,
        INFRASTRUCTURE_CONSTANTS.PG,
        INFRASTRUCTURE_CONSTANTS.REDIS,
    ],
})
export class InfrastructureModule {}