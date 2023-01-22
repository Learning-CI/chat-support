import { EventInterface } from './event';

export interface EventDispatcher {
  send(event: EventInterface): Promise<void>;
}
