import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { EventInterface } from '../../../../@shared/event/event';
import { BotTrainingEventDispatcher } from '../../../../domain/bot-training/event/bot-training-event-dispatcher';

@Injectable()
export class BotTrainingPublisher implements BotTrainingEventDispatcher {
  constructor(@InjectQueue('bot-training') private botTrainingQueue: Queue) {
    this.botTrainingQueue.on('error', (error: Error) => {
      console.log(error);
    });
  }

  async send(event: EventInterface): Promise<void> {
    const response = await this.botTrainingQueue.add(event, {
      attempts: 1,
      removeOnFail: true,
    });
    console.log({ response });
  }
}
