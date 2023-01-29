import { MachineLearningClient } from './machine-learning-client';
import { ChatGpt3OpenAI } from '../../../../infrastructure/machine-learning/service/chat-gpt/chat-gpt-open-ai';
import { MachineLearningProvider } from '../../../machine-learning/enum/machine-learning-provider.enum';
import { MachineLearningNotFound } from '../../../machine-learning/error/machine-learning-not-found.error';
import { EnvConfigService } from '../../../../@shared/env-config/env-config.interface';

export class MachineLearningFactory {
  constructor(private readonly configService: EnvConfigService) {}

  getTrainingInstance(
    providerId: MachineLearningProvider,
  ): MachineLearningClient {
    if (providerId === MachineLearningProvider.CHAT_GPT) {
      return new ChatGpt3OpenAI(this.configService.getOpenAi());
    }
    throw new MachineLearningNotFound(
      `Machine Learning provider not found for id: ${providerId}`,
    );
  }
}
