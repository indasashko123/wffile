import { IEvent } from "../../../../core/domain/events/event";

export abstract class EventBus {
  abstract publish<T extends IEvent>(event: T): void;
  abstract subscribe<T extends IEvent>(eventType: string, handler: EventHandler<T>): void;
}



export type EventHandler<T extends IEvent> = (event: T) => void;