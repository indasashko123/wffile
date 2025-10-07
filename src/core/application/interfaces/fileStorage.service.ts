import { FilePath } from "../../../core/domain/file";
import { FileDto } from "../dto/request/file.dto";

export interface IFileStorageService {
    saveFile(data: FileDto) : Promise<string>;
    getFileStream(fileRecord: FilePath): Promise<NodeJS.ReadableStream>
}