import { QuestionAndAnswerToTrain } from '../../bot-training/event/bot-training-events';
import { MachineLearningFactory } from '../../bot-training/service/bot/machine-learning.factory';
import { MachineLearningBot } from '../entity/machine-learning-bot';
import { MachineLearningBotRepository } from '../repository/machine-learning-bot.repository';
import { MachineLearningClient } from '../../bot-training/service/bot/machine-learning-client';
import { BotResponse } from '../type/bot-response';

export class MachineLearningBotService {
  constructor(
    private readonly machineLearningFactory: MachineLearningFactory,
    private readonly machineLearningBotRepository: MachineLearningBotRepository,
  ) {}

  async trainMachineLearningProviders(dataToTrain: QuestionAndAnswerToTrain) {
    const botProviders =
      await this.machineLearningBotRepository.findAvailableForTraining(
        dataToTrain.botId,
      );

    const sendingTrainingDataToProviders = botProviders.map((botProvider) => {
      return this.trainMachineLearningProvider(botProvider);
    });
    await Promise.allSettled(sendingTrainingDataToProviders);
  }

  private async trainMachineLearningProvider(
    machineLearningBot: MachineLearningBot,
  ): Promise<BotResponse> {
    const botId = machineLearningBot.getBot().getId();
    const machineLearningId = machineLearningBot.getMachineLearning().getId();
    const machineLearningClient =
      this.machineLearningFactory.getTrainingInstance(machineLearningId);
    const contextId = await this.getOrCreateContext(
      machineLearningClient,
      machineLearningBot,
    );
    const response = await machineLearningClient.sendPrompt(
      contextId,
      'QUESTION AND ANSWER',
    );
    console.log({ response });
    return { botId, machineLearningId, response };
  }

  private async getOrCreateContext(
    machineLearningClient: MachineLearningClient,
    machineLearningBot: MachineLearningBot,
  ): Promise<string> {
    if (machineLearningBot.hasConversationContext()) {
      return machineLearningBot.getConversationContext();
    }
    const contextId = await machineLearningClient.createContext();
    machineLearningBot.saveConversationContext(contextId);
    await this.machineLearningBotRepository.update(machineLearningBot);
    return contextId;
  }
}
