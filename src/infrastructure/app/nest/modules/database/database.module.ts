import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingHistoryModel } from '../../../../bot-training/repository/typeorm/training-history/training-history.model';
import { TrainingHistoryRepo } from '../../../../bot-training/repository/typeorm/training-history/training-history.repo';
import { NestEnvConfigService } from '../../../../env-config/nest/nest-env-config.service';
import { ConfModule } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingHistoryModel]),
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
  providers: [TrainingHistoryRepo],
  exports: [TrainingHistoryRepo],
})
export class DatabaseModule {}
