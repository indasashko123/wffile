export interface IFileStorageConfig {
    pathToStorage: string;
}

export class FileStorageConfig implements IFileStorageConfig {
    pathToStorage: string;
    constructor() {
        this.pathToStorage = process.env.PATH_TO_STORAGE || 'localhost:3003/api/files/download/';
    }
}