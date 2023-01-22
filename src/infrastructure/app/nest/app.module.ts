import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingHandlerService } from '../../../domain/bot-training/service/training-handler.service';
import { TrainingService } from '../../../domain/bot-training/service/training.service';
import { BotTrainingController } from '../../bot-training/api/nest/bot-training.controller';
import { BotTrainingPublisher } from '../../bot-training/event/nest-bull/bot-training-publisher';
import { TrainingHistoryModel } from '../../bot-training/repository/typeorm/training-history/training-history.model';
import { TrainingHistoryRepo } from '../../bot-training/repository/typeorm/training-history/training-history.repo';
import { NestEnvConfigService } from '../../env-config/nest/nest-env-config.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingHistoryModel]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/infrastructure/env-config/.env',
    }),
    TypeOrmModule.forRootAsync({
      extraProviders: [NestEnvConfigService],
      imports: [ConfigModule],
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
    BullModule.forRootAsync({
      imports: [
        {
          module: ConfigModule,
          providers: [NestEnvConfigService],
          exports: [NestEnvConfigService],
        },
      ],
      useFactory: async (configService: NestEnvConfigService) => {
        return {
          redis: configService.getRedis(),
        };
      },
      inject: [NestEnvConfigService],
    }),
    BullModule.registerQueue({
      name: 'bot-training',
      defaultJobOptions: {
        timeout: 3000,
      },
    }),
  ],
  providers: [
    TrainingHistoryRepo,
    BotTrainingPublisher,
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
