import { FilePath, IFilePathRepository } from "../../../core/domain/file";
import { IFileService, IFileStorageService } from "../interfaces";
import { FileDto } from "../dto/request/file.dto";
import { FileResponse } from "../dto";
import { EventBus } from "../common/events";
import { FileUploadedEvent } from "../../../core/domain/events/file.event";


export abstract class FileAbstractService implements IFileService {
    
    constructor (
        private readonly fileStorageService: IFileStorageService,
        private readonly filePathRepository: IFilePathRepository,
        private readonly eventBus: EventBus,
    ) {
    }
    
    
    async getFile(fileId: string): Promise<FileResponse> {
       const filePath = await this.filePathRepository.getById(fileId);
       const stream = await this.fileStorageService.getFileStream(filePath);
       return {
        filePath: filePath,
        stream: stream,
       }
    }

    async saveFile(data: FileDto): Promise<FilePath> {
        const path =await this.fileStorageService.saveFile(data);
        const filePath = await this.filePathRepository.create({
            accountId: data.accountId,
            mimeType: data.mimetype,
            originalName: data.originalName,
            path: path
        });
        this.eventBus.publish(new FileUploadedEvent(
            filePath.id,
            filePath.originalName,
            `/api/files/download/${filePath.id}`,
            data.accountId,
            data.accountId
        ));
        return filePath;
    }
    
    async getByAccount(accountId: string): Promise<FilePath[]> {
        return await this.filePathRepository.getByAccount(accountId);
    }
    
    async getById(id: string): Promise<FilePath> {
        return await this.filePathRepository.getById(id);
    }
}