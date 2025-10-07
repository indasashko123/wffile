import { Module } from "@nestjs/common";
import { InfrastructureModule } from "../infrastructure";
import { AuthModule } from "../auth/auth.module";
import { FILE_CONSTANTS } from "../constants";
import { FilePathRepository } from "./repository";
import { FileController } from "./controllers";
import { FileService } from "./services/file.service";
import { FileStorageService } from "./services/fileStorage.service";
import { EventModule } from "../events/event.module";

@Module({
    imports: [
        InfrastructureModule,
        AuthModule,
        EventModule
    ],
    controllers: [
        FileController
    ],
    providers: [
        {provide: FILE_CONSTANTS.FILE_PATH_REPOSITORY, useClass: FilePathRepository},
        {provide: FILE_CONSTANTS.FILE_SERVICE, useClass: FileService},
        {provide: FILE_CONSTANTS.FILE_STORAGE_SERVICE, useClass: FileStorageService},
    ]
})
export class FileModule {
    
}