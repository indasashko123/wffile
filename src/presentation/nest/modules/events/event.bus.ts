import { Injectable } from "@nestjs/common";
import { EventBus, EventHandler } from "../../../../core/application/common/events";
import { IEvent } from "../../../..//core/domain/events/event";

@Injectable()
export class NestEventBus extends EventBus {
  private handlers = new Map<string, EventHandler<any>[]>();

  publish<T extends IEvent>(event: T): void {
    const eventHandlers = this.handlers.get(event.type) || [];
    eventHandlers.forEach(handler => handler(event));
  }

  subscribe<T extends IEvent>(eventType: string, handler: EventHandler<T>): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);
  }
}