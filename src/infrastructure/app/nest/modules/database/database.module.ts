import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingHistoryModel } from '../../../../bot-training/repository/typeorm/training-history/training-history.model';
import { TrainingHistoryRepo } from '../../../../bot-training/repository/typeorm/training-history/training-history.repo';
import { BotModel } from '../../../../bot/repository/typeorm/bot.model';
import { NestEnvConfigService } from '../../../../env-config/nest/nest-env-config.service';
import { MachineLearningBotModel } from '../../../../machine-learning/repository/typeorm/machine-learning-bot.model';
import { MachineLearningBotRepo } from '../../../../machine-learning/repository/typeorm/machine-learning-bot.repo';
import { MachineLearningModel } from '../../../../machine-learning/repository/typeorm/machine-learning.model';
import { ConfModule } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BotModel,
      MachineLearningModel,
      TrainingHistoryModel,
      MachineLearningBotModel,
    ]),
    TypeOrmModule.forRootAsync({
      extraProviders: [NestEnvConfigService],
      imports: [ConfModule],
      useFactory: (configService: NestEnvConfigService) => {
        const database = configService.getDatabase();
        return {
          ...database,
          type: 'mysql',
          autoLoadEntities: true,
          synchronize: false,
        };
      },
      inject: [NestEnvConfigService],
    }),
  ],
  providers: [TrainingHistoryRepo, MachineLearningBotRepo],
  exports: [TrainingHistoryRepo, MachineLearningBotRepo],
})
export class DatabaseModule {}
