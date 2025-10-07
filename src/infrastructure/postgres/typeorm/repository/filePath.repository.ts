import { CommonError } from "../../../../core/application";
import { CreateFilePathDto, FilePath, IFilePathRepository } from "../../../../core/domain/file";
import { FilePathModel } from "../models/filePath.model";


export abstract class FilePathAbstractRepository implements IFilePathRepository {
    
    async getByAccount(accountId: string): Promise<FilePath[]> {
        return await FilePathModel.find({where: {
            accountId: accountId
        }});
    }
    async getById(id: string): Promise<FilePath> {
        const filePath = await FilePathModel.findOne({
            where: {
                id: id
            }
        });
        if (!filePath) {
            CommonError.NotFound(`File not found`);
        }
        return filePath;
    }
    async create(data: CreateFilePathDto): Promise<FilePath> {
        const filePath = new FilePathModel({
            accountId: data.accountId,
            path: data.path,
            mimeType: data.mimeType,
            originalName: data.originalName
        });
        const createFilePath = await FilePathModel.save(filePath);
        return createFilePath;
    }

}