import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { EventInterface } from '../../../../@shared/event/event';
import { BotTrainingEventConsumer } from '../../../../domain/bot-training/event/bot-training-event-consumer';

@Injectable()
@Processor('bot-training')
export class BotTrainingConsumer extends BotTrainingEventConsumer {
  @Process()
  process(job: Job): Promise<void> {
    return super.process(job);
  }

  convertExternalPayloadToDomainEvent(job: Job): EventInterface<any> {
    return job.data;
  }
}
