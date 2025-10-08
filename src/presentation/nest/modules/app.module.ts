import { Module } from "@nestjs/common";
import { AuthModule } from "./auth";
import { InfrastructureModule } from "./infrastructure";
import { FileModule } from "./file";
import { EventModule } from "./events/event.module";
import { ChatModule } from "./chat/chat.module";



@Module({
    imports: [InfrastructureModule, AuthModule, FileModule, EventModule, ChatModule]
})
export class AppModule {}