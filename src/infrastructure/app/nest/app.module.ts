import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingHandlerService } from '../../../domain/bot-training/service/training-handler.service';
import { BotTrainingController } from '../../bot-training/api/nest/bot-training.controller';
import { NestEnvConfigService } from '../../env-config/nest/nest-env-config.service';
import { AppController } from './app.controller';

@Module({
  imports: [
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
  ],
  providers: [
    {
      provide: TrainingHandlerService,
      useValue: new TrainingHandlerService(),
    },
  ],
  controllers: [AppController, BotTrainingController],
})
export class AppModule {}
