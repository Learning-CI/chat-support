import { Module } from '@nestjs/common';
import { BotTrainingController } from '../../bot-training/api/nest/bot-training.controller';
import { AppController } from './app.controller';
import { BullCustomModule } from './modules/bull/bull.module';
import { ConfModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database-module';
import { DomainModule } from './modules/domain/domain.module';

@Module({
  imports: [ConfModule, DatabaseModule, BullCustomModule, DomainModule],
  providers: [],
  controllers: [AppController, BotTrainingController],
})
export class AppModule {}
