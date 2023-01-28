import { forwardRef, Module } from '@nestjs/common';
import { BotTrainingEventHandler } from '../../../../../domain/bot-training/event/bot-training-event-handler';
import { MachineLearningFactory } from '../../../../../domain/bot-training/service/bot/machine-learning.factory';
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
      provide: MachineLearningFactory,
      useFactory: (chatGpt3: ChatGpt3) => new MachineLearningFactory(chatGpt3),
      inject: [ChatGpt3],
    },
    {
      provide: TrainingService,
      useFactory: (
        trainingHistoryRepo: TrainingHistoryRepo,
        botTrainingPublisher: BotTrainingPublisher,
        machineLearningFactory: MachineLearningFactory,
      ) =>
        new TrainingService(
          trainingHistoryRepo,
          botTrainingPublisher,
          machineLearningFactory,
        ),
      inject: [
        TrainingHistoryRepo,
        BotTrainingPublisher,
        MachineLearningFactory,
      ],
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
