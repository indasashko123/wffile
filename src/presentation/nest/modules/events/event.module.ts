import { Module } from "@nestjs/common";
import { EVENT_CONSTANTS } from "../constants";
import { NestEventBus } from "./event.bus";


@Module({
    providers: [
        {provide: EVENT_CONSTANTS.EVENT_BUS, useClass: NestEventBus}
    ],
    exports : [
        EVENT_CONSTANTS.EVENT_BUS
    ]
})
export class EventModule {}