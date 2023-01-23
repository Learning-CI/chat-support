import { EventInterface } from './event';

export interface EventHandler {
  handle(event: EventInterface<any>): Promise<void>;
}
