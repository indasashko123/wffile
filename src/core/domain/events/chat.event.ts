import { IEvent } from "./event";
import { EventType } from "./eventType.enum";

export class UserJoinedEvent implements IEvent {
  readonly type = EventType.join_chat;
  readonly timestamp = new Date();

  constructor(
    public readonly userId: string,
    public readonly username: string,
  ) {}
}

export class MessageSentEvent implements IEvent {
  readonly type = EventType.send_message;
  readonly timestamp = new Date();

  constructor(
    public readonly userId: string,
    public readonly username: string,
    public readonly content: string,
  ) {}
}