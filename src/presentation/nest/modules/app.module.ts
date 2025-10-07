import { Module } from "@nestjs/common";
import { AuthModule } from "./auth";
import { InfrastructureModule } from "./infrastructure";
import { FileModule } from "./file";
import { EventModule } from "./events/event.module";



@Module({
    imports: [InfrastructureModule, AuthModule, FileModule, EventModule]
})
export class AppModule {}