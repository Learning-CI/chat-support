import { Repository } from '../../../@shared/repository/repository.interface';
import { MachineLearningBot } from '../entity/machine-learning-bot';

interface MachineLearningBotCustomMethods {
  findAvailableForTraining(botId: number): Promise<MachineLearningBot[]>;
}

export type MachineLearningBotRepository = Repository<MachineLearningBot> &
  MachineLearningBotCustomMethods;
