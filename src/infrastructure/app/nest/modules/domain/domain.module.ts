import { forwardRef, Module } from '@nestjs/common';
import { BotTrainingEventHandler } from '../../../../../domain/bot-training/event/bot-training-event-handler';
import { MachineLearningFactory } from '../../../../../domain/bot-training/service/bot/machine-learning.factory';
import { ChatGpt3OpenAI } from '../../../../machine-learning/service/chat-gpt/chat-gpt-open-ai';
import { TrainingHandlerService } from '../../../../../domain/bot-training/service/training-handler.service';
import { TrainingService } from '../../../../../domain/bot-training/service/training.service';
import { BotTrainingPublisher } from '../../../../bot-training/event/nest-bull/bot-training-publisher';
import { TrainingHistoryRepo } from '../../../../bot-training/repository/typeorm/training-history/training-history.repo';
import { BullCustomModule } from '../bull/bull.module';
import { DatabaseModule } from '../database/database.module';
import { MachineLearningBotService } from '../../../../../domain/machine-learning/service/machine-learning-bot.service';
import { MachineLearningBotRepo } from '../../../../machine-learning/repository/typeorm/machine-learning-bot.repo';

@Module({
  imports: [DatabaseModule, forwardRef(() => BullCustomModule)],
  providers: [
    {
      provide: MachineLearningFactory,
      useFactory: (chatGpt3: ChatGpt3OpenAI) =>
        new MachineLearningFactory(chatGpt3),
      inject: [ChatGpt3OpenAI],
    },
    {
      provide: MachineLearningBotService,
      useFactory: (
        machineLearningFactory: MachineLearningFactory,
        machineLearningBotRepo: MachineLearningBotRepo,
      ) =>
        new MachineLearningBotService(
          machineLearningFactory,
          machineLearningBotRepo,
        ),
      inject: [MachineLearningFactory, MachineLearningBotRepo],
    },
    {
      provide: TrainingService,
      useFactory: (
        trainingHistoryRepo: TrainingHistoryRepo,
        botTrainingPublisher: BotTrainingPublisher,
        machineLearningBotService: MachineLearningBotService,
      ) =>
        new TrainingService(
          trainingHistoryRepo,
          botTrainingPublisher,
          machineLearningBotService,
        ),
      inject: [
        TrainingHistoryRepo,
        BotTrainingPublisher,
        MachineLearningBotService,
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
    ChatGpt3OpenAI,
  ],

  exports: [TrainingService, TrainingHandlerService, BotTrainingEventHandler],
})
export class DomainModule {}
