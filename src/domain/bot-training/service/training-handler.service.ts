import { Bot } from '../../../@shared/entity/bot';
import { Trainer } from '../entity/trainer';
import { TrainingHistory } from '../entity/training-history';
import { TrainingService } from './training.service';

export class TrainingHandlerService {
  constructor(private readonly trainingService: TrainingService) {}

  async train(data: {
    userId: string;
    question: string;
    answer: string;
  }): Promise<void> {
    // Check permissions
    // Create entities
    const bot = new Bot(1, 'Bot 1');
    const trainer = new Trainer(1, 'John');
    const history = new TrainingHistory(
      bot.getId(),
      trainer,
      data.question,
      data.answer,
    );
    return this.trainingService.train(bot, trainer, history);
  }
}
