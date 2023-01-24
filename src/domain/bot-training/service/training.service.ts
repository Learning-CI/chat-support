import { Bot } from '../../../@shared/entity/bot';
import { EventInterface, EventType } from '../../../@shared/event/event';
import { Trainer } from '../entity/trainer';
import { TrainingHistory } from '../entity/training-history';
import { BotTrainingEventDispatcher } from '../event/bot-training-event-dispatcher';
import { QuestionAndAnswerToTrain } from '../event/bot-training-events';
import { TrainingHistoryRepository } from '../repository/training-history.repository';
import { BotManagerFactory } from './bot/bot-manager.factory';

export class TrainingService {
  constructor(
    private readonly trainingHistoryRepository: TrainingHistoryRepository,
    private readonly botTrainingEventDispatcher: BotTrainingEventDispatcher,
    private readonly BotManagerFactory: BotManagerFactory,
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

  async sendQuestionAndAnswerToBot(
    event: EventInterface<QuestionAndAnswerToTrain>,
  ) {
    const { trainingData } = event.content;
    const botManager = await this.BotManagerFactory.getInstance();
    const response = await botManager.sendQuestionAndAnswer('', {
      trainingData,
    });
    console.log({ response });
  }
}

/*
Bot: 
id, name

Language Model:
id, name

BotLanguageModels:
bot_id, lanaugage_model_id, active, chat_id


*/
