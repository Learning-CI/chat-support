import { Bot } from '../../../@shared/entity/bot';
import { EventInterface, EventType } from '../../../@shared/event/event';
import { Trainer } from '../entity/trainer';
import { TrainingHistory } from '../entity/training-history';
import { BotTrainingEventDispatcher } from '../event/bot-training-event-dispatcher';
import { QuestionAndAnswerToTrain } from '../event/bot-training-events';
import { TrainingHistoryRepository } from '../repository/training-history.repository';

export class TrainingService {
  constructor(
    private readonly trainingHistoryRepository: TrainingHistoryRepository,
    private readonly botTrainingEventDispatcher: BotTrainingEventDispatcher,
  ) {}

  async train(
    bot: Bot,
    trainer: Trainer,
    newTrainingHistory: TrainingHistory,
  ): Promise<void> {
    const savedHistory = await this.trainingHistoryRepository.create(
      newTrainingHistory,
    );
    const event: EventInterface<QuestionAndAnswerToTrain> = {
      type: EventType.QUESTION_AND_ANSWER_TO_TRAIN,
      date: new Date(),
      content: {
        trainingData: savedHistory,
      },
    };
    await this.botTrainingEventDispatcher.send(event);
  }
}
