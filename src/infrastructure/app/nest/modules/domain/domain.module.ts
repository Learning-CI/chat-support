import { forwardRef, Module } from '@nestjs/common';
import { BotTrainingEventHandler } from '../../../../../domain/bot-training/event/bot-training-event-handler';
import { BotManagerFactory } from '../../../../../domain/bot-training/service/bot/bot-manager.factory';
import { ChatGpt3 } from '../../../../../domain/bot-training/service/bot/chat-gpt/chat-gpt-bot';
import { TrainingHandlerService } from '../../../../../domain/bot-training/service/training-handler.service';
import { TrainingService } from '../../../../../domain/bot-training/service/training.service';
import { BotTrainingPublisher } from '../../../../bot-training/event/nest-bull/bot-training-publisher';
import { TrainingHistoryRepo } from '../../../../bot-training/repository/typeorm/training-history/training-history.repo';
import { BullCustomModule } from '../bull/bull.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => BullCustomModule)],
  providers: [
    {
      provide: BotManagerFactory,
      useFactory: (chatGpt3: ChatGpt3) => new BotManagerFactory(chatGpt3),
      inject: [ChatGpt3],
    },
    {
      provide: TrainingService,
      useFactory: (
        trainingHistoryRepo: TrainingHistoryRepo,
        botTrainingPublisher: BotTrainingPublisher,
        botManagerFactory: BotManagerFactory,
      ) =>
        new TrainingService(
          trainingHistoryRepo,
          botTrainingPublisher,
          botManagerFactory,
        ),
      inject: [TrainingHistoryRepo, BotTrainingPublisher, BotManagerFactory],
    },
    {
      provide: TrainingHandlerService,
      useFactory: (trainingService: TrainingService) =>
        new TrainingHandlerService(trainingService),
      inject: [TrainingService],
    },
    {
      provide: BotTrainingEventHandler,
      useFactory: (trainingService: TrainingService) =>
        new BotTrainingEventHandler(trainingService),
      inject: [TrainingService],
    },
    ChatGpt3,
  ],

  exports: [TrainingService, TrainingHandlerService, BotTrainingEventHandler],
})
export class DomainModule {}
