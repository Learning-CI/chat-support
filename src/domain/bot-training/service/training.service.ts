import { Bot } from '../../../@shared/entity/bot';
import { Trainer } from '../entity/trainer';
import { TrainingHistory } from '../entity/training-history';
import { TrainingHistoryRepository } from '../repository/training-history.repository';

export class TrainingService {
  constructor(
    private readonly trainingHistoryRepository: TrainingHistoryRepository,
  ) {}

  async train(
    bot: Bot,
    trainer: Trainer,
    newTrainingHistory: TrainingHistory,
  ): Promise<void> {
    const savedHistory = await this.trainingHistoryRepository.create(
      newTrainingHistory,
    );
    console.log({ savedHistory });
    return null;
  }
}
