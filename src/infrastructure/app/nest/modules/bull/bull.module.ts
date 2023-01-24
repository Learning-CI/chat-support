import { BullModule } from '@nestjs/bull';
import { forwardRef, Module } from '@nestjs/common';
import { BotTrainingEventHandler } from '../../../../../domain/bot-training/event/bot-training-event-handler';
import { BotTrainingConsumer } from '../../../../bot-training/event/nest-bull/bot-training-consumer';
import { BotTrainingPublisher } from '../../../../bot-training/event/nest-bull/bot-training-publisher';
import { NestEnvConfigService } from '../../../../env-config/nest/nest-env-config.service';
import { ConfModule } from '../config/config.module';
import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [
    forwardRef(() => DomainModule),
    BullModule.forRootAsync({
      imports: [
        {
          module: ConfModule,
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
    BotTrainingConsumer,
    BotTrainingPublisher,
    {
      provide: BotTrainingConsumer,
      useFactory: (eventHandler: BotTrainingEventHandler) =>
        new BotTrainingConsumer(eventHandler),
      inject: [BotTrainingEventHandler],
    },
  ],
  exports: [BotTrainingConsumer, BotTrainingPublisher],
})
export class BullCustomModule {}
