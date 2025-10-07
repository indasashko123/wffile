import { Inject, Injectable } from "@nestjs/common";
import { EventBus } from "../../../../core/application/common/events";
import { FileUploadedEvent, UserJoinedEvent, MessageSentEvent, EventType} from "../../../../core/domain/events/";
import { EVENT_CONSTANTS } from "../constants";
import { Server } from 'socket.io';
import { WebSocketServer } from "@nestjs/websockets";

@Injectable()
export class ChatService {
  
  @WebSocketServer()
  private server: Server;

  constructor(
    @Inject(EVENT_CONSTANTS.EVENT_BUS) private readonly eventBus: EventBus
) {
    this.eventBus.subscribe(EventType.file_upload, this.handleFileUploaded.bind(this));
    this.eventBus.subscribe(EventType.join_chat, this.handleUserJoined.bind(this));
    this.eventBus.subscribe(EventType.send_message, this.handleUserMessage.bind(this));
  }

  private handleFileUploaded(event: FileUploadedEvent): void {
    this.broadcastToAll('file_uploaded', {
      fileUrl: event.fileUrl,
      fileName: event.fileName,
      uploadedBy: event.uploadedBy,
      timestamp: event.timestamp
    });
  }

  private handleUserJoined(event: UserJoinedEvent): void {
    this.broadcastToAll('user_joined', {
      username: event.username,
      message: `${event.username} вошел в чат`,
      timestamp: event.timestamp
    });
  }

  private handleUserMessage(event: MessageSentEvent): void {
    this.broadcastToAll('send_message', {
      username: event.username,
      message: event.content,
      timestamp: event.timestamp
    });
  }

  private broadcastToAll(event: string, data: any): void {
    this.server.emit(event, data);
  }
}