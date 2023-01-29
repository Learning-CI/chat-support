import { EventInterface } from '../../../@shared/event/event';
import { EventConsumer } from '../../../@shared/event/event-consumer';
import { EventHandler } from '../../../@shared/event/event-handler';

export abstract class BotTrainingEventConsumer implements EventConsumer {
  constructor(protected readonly eventHandler: EventHandler) {}

  abstract convertExternalPayloadToDomainEvent(
    payload: any,
  ): EventInterface<any>;

  async process(data: any): Promise<void> {
    const event = this.convertExternalPayloadToDomainEvent(data);
    await this.eventHandler.handle(event);
  }
}
