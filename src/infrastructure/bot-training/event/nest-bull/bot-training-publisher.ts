import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { EventInterface } from '../../../../@shared/event/event';
import { BotTrainingEventDispatcher } from '../../../../domain/bot-training/event/bot-training-event-dispatcher';

@Injectable()
export class BotTrainingPublisher implements BotTrainingEventDispatcher {
  constructor(@InjectQueue('bot-training') private botTrainingQueue: Queue) {}

  async send(event: EventInterface<any>): Promise<void> {
    await this.botTrainingQueue.add(event, {
      attempts: 1,
      removeOnFail: true,
    });
  }
}
