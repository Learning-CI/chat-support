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
      return this.trainMachineLearningProvider(botProvider, dataToTrain);
    });
    await Promise.allSettled(sendingTrainingDataToProviders);
  }

  private async trainMachineLearningProvider(
    machineLearningBot: MachineLearningBot,
    dataToTrain: QuestionAndAnswerToTrain,
  ): Promise<BotResponse> {
    let botId: number;
    let machineLearningId: number;
    try {
      botId = machineLearningBot.getBot().getId();
      machineLearningId = machineLearningBot.getMachineLearning().getId();
      console.log(
        `Started training botId: ${botId} with machineLearningId: ${machineLearningId}`,
      );
      const machineLearningClient =
        this.machineLearningFactory.getTrainingInstance(machineLearningId);
      const contextId = await this.getOrCreateContext(
        machineLearningClient,
        machineLearningBot,
      );
      const response = await machineLearningClient.train(
        contextId,
        `Question: ${dataToTrain.question} Answer: ${dataToTrain.answer}}`,
      );
      console.log(
        `Finished training botId: ${botId} with machineLearningId: ${machineLearningId}`,
      );
      return { botId, machineLearningId, response };
    } catch (error) {
      console.error(
        `The following error ocurred: "${error.message}" while while training botId: ${botId} with machineLearningId: ${machineLearningId}`,
      );
      console.error({ errorDetails: error });
      throw error;
    }
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
