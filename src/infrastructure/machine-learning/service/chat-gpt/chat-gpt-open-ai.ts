import { MachineLearningClient } from '../../../../domain/bot-training/service/bot/machine-learning-client';

export class ChatGpt3OpenAI implements MachineLearningClient {
  async createContext(): Promise<string> {
    return '2';
  }

  async sendPrompt(contextId: string, prompt: string): Promise<string> {
    return 'vitor';
  }
}
