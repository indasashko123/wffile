import { Inject, Injectable } from "@nestjs/common";
import { FileAbstractService, IFileStorageService } from "../../../../../core/application";
import { EVENT_CONSTANTS, FILE_CONSTANTS } from "../../constants";
import { IFilePathRepository } from "../../../../../core/domain/file";
import { NestEventBus } from "../../events/event.bus";

@Injectable()
export class FileService extends FileAbstractService {
    constructor(
        @Inject(FILE_CONSTANTS.FILE_PATH_REPOSITORY) filePathRepository: IFilePathRepository,
        @Inject(FILE_CONSTANTS.FILE_STORAGE_SERVICE) fileStorageService: IFileStorageService,
        @Inject(EVENT_CONSTANTS.EVENT_BUS) eventBus: NestEventBus
    ) {
        super(
            fileStorageService,
            filePathRepository,
            eventBus,
        );
    }
}