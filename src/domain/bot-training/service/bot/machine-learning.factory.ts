import { MachineLearningClient } from './machine-learning-client';
import { ChatGpt3OpenAI } from '../../../../infrastructure/machine-learning/service/chat-gpt/chat-gpt-open-ai';
import { MachineLearningProvider } from '../../../machine-learning/enum/machine-learning-provider.enum';
import { MachineLearningNotFound } from '../../../machine-learning/error/machine-learning-not-found.error';

export class MachineLearningFactory {
  constructor(private readonly chatGpt3: ChatGpt3OpenAI) {}

  private providers = {
    [MachineLearningProvider.CHAT_GPT]: this.chatGpt3,
  };

  getTrainingInstance(
    providerId: MachineLearningProvider,
  ): MachineLearningClient {
    const provider = this.providers[providerId];
    if (!provider) {
      throw new MachineLearningNotFound(
        `Machine Learning provider not found for id: ${providerId}`,
      );
    }
    return provider;
  }
}
