import { EventInterface } from './event';

export interface EventDispatcher {
  send(event: EventInterface<any>): Promise<void>;
}
