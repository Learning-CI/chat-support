import { EventInterface } from './event';

export interface EventConsumer {
  process(event: any): Promise<void>;
  convertExternalPayloadToDomainEvent(data: any): EventInterface<any>;
}
