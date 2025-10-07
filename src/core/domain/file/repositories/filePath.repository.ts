import { CreateFilePathDto } from "../dto";
import { FilePath } from "../entities/filePath.core";

export interface IFilePathRepository {
    getByAccount(account: string): Promise<FilePath[]>;
    getById(id: string): Promise<FilePath>;
    create(data: CreateFilePathDto): Promise<FilePath>;
}