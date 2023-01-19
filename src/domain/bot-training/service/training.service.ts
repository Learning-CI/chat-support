import { Bot } from '../../../@shared/entity/bot';
import { Trainer } from '../entity/trainer';
import { TrainingHistory } from '../entity/training-history';
import { TrainingHistoryRepository } from '../repository/training-history.repository';

export class TrainingService {
  private constructor(
    private readonly trainingHistoryRepository: TrainingHistoryRepository,
  ) {}

  async train(
    bot: Bot,
    trainer: Trainer,
    question: string,
    answer: string,
  ): Promise<void> {
    const trainingHistory = new TrainingHistory(
      bot.getId(),
      trainer,
      question,
      answer,
    );
    await this.trainingHistoryRepository.create(trainingHistory);
    // send message to queue.
  }
}
