import { Module } from "@nestjs/common";
import { EventModule } from "../events/event.module";
import { AuthModule } from "../auth";
import { CHAT_CONSTANTS } from "../constants";
import { ChatService } from "./chat.service";
import { ChatGateway } from "./chat.gateway";


@Module({
    imports: [EventModule, AuthModule],
    providers: [
        {provide: CHAT_CONSTANTS.CHAT_SERVICE, useClass: ChatService},
        {provide: CHAT_CONSTANTS.CHAT_GATEWAY, useClass: ChatGateway}
    ],
    exports : [
        CHAT_CONSTANTS.CHAT_SERVICE
    ]
})
export class ChatModule {}