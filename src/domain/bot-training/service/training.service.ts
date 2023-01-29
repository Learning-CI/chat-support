import { Bot } from '../../bot/entity/bot';
import { EventInterface, EventType } from '../../../@shared/event/event';
import { Trainer } from '../entity/trainer';
import { TrainingHistory } from '../entity/training-history';
import { BotTrainingEventDispatcher } from '../event/bot-training-event-dispatcher';
import { QuestionAndAnswerToTrain } from '../event/bot-training-events';
import { TrainingHistoryRepository } from '../repository/training-history.repository';
import { MachineLearningBotService } from '../../machine-learning/service/machine-learning-bot.service';

export class TrainingService {
  constructor(
    private readonly trainingHistoryRepository: TrainingHistoryRepository,
    private readonly botTrainingEventDispatcher: BotTrainingEventDispatcher,
    private readonly machineLearningBotService: MachineLearningBotService,
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
        botId: savedHistory.getBotId(),
        question: savedHistory.getQuestion(),
        answer: savedHistory.getAnswer(),
      },
    };
    await this.botTrainingEventDispatcher.send(event);
  }

  async sendQuestionAndAnswerToAI(
    event: EventInterface<QuestionAndAnswerToTrain>,
  ) {
    await this.machineLearningBotService.trainMachineLearningProviders(
      event.content,
    );
  }
}
