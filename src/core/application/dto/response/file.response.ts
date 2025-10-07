import { FilePath } from "../../../../core/domain/file"

export class FileResponse {
    filePath: FilePath;
    stream: NodeJS.ReadableStream;
}