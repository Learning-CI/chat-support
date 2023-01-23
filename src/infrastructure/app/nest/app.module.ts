import { Module } from '@nestjs/common';
import { TrainingHandlerService } from '../../../domain/bot-training/service/training-handler.service';
import { TrainingService } from '../../../domain/bot-training/service/training.service';
import { BotTrainingController } from '../../bot-training/api/nest/bot-training.controller';
import { BotTrainingPublisher } from '../../bot-training/event/nest-bull/bot-training-publisher';
import { TrainingHistoryRepo } from '../../bot-training/repository/typeorm/training-history/training-history.repo';
import { AppController } from './app.controller';
import { BullCustomModule } from './modules/bull/bull.module';
import { ConfModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database-module';

@Module({
  imports: [ConfModule, DatabaseModule, BullCustomModule],
  providers: [
    {
      provide: TrainingService,
      useFactory: (
        trainingHistoryRepo: TrainingHistoryRepo,
        botTrainingPublisher: BotTrainingPublisher,
      ) => new TrainingService(trainingHistoryRepo, botTrainingPublisher),
      inject: [TrainingHistoryRepo, BotTrainingPublisher],
    },
    {
      provide: TrainingHandlerService,
      useFactory: (trainingService: TrainingService) =>
        new TrainingHandlerService(trainingService),
      inject: [TrainingService],
    },
  ],
  controllers: [AppController, BotTrainingController],
})
export class AppModule {}
