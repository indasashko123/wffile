import { Injectable } from '@nestjs/common';
import { IFileStorageService } from '../interfaces';
import { v4 } from 'uuid';
import { FileDto } from '../dto/request/file.dto';
import { extname } from 'path';
import * as fs from 'fs';
import { IConfig } from '../config';
import { FilePath } from '../../../core/domain/file';
import { CommonError } from '../common';

@Injectable()
export abstract class LocalStorageAbstractService implements IFileStorageService {
  
    private path : string;

    constructor(
        private readonly config: IConfig
    ) {
        this.path =  config.fileStorageConfig.pathToStorage;
    }

    async getFileStream(filePath: FilePath): Promise<NodeJS.ReadableStream> {
        if (!fs.existsSync(filePath.path)) {
            CommonError.NotFound('File not found');
        }
        return fs.createReadStream(filePath.path);
    }

    async saveFile(file: FileDto): Promise<string> {
        const fileExtension = extname(file.originalName);
        const uniqueFilename = `${v4()}${fileExtension}`;
        const filePath = `uploads/${file.accountId}/${uniqueFilename}`;
        fs.mkdirSync(`uploads/${file.accountId}`, { recursive: true });
        fs.writeFileSync(filePath, file.buffer);
        return filePath;
    }

}