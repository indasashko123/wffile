import { IEvent } from "./event";
import { EventType } from "./eventType.enum";

export class FileUploadedEvent implements IEvent {
  readonly type = EventType.file_upload;
  readonly timestamp = new Date();

  constructor(
    public readonly fileId: string,
    public readonly fileName: string,
    public readonly fileUrl: string,
    public readonly uploadedBy: string,
    public readonly accountId: string,
  ) {}
}