import { FilePath } from "../../../core/domain/file";
import { FileDto } from "../dto/request/file.dto";
import { FileResponse } from "../dto";

export interface IFileService {
    saveFile(data: FileDto): Promise<FilePath>;
    getByAccount(accountId: string): Promise<FilePath[]>;
    getById(id: string): Promise<FilePath>;
    getFile(id: string): Promise<FileResponse>
}