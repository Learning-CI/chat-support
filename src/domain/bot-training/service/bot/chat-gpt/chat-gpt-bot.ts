import { MachineLearningClient } from '../machine-learning-client';

export class ChatGpt3 implements MachineLearningClient {
  async createNewContext(): Promise<string> {
    return '1';
  }

  async train(contextId: string, trainingInformation: string): Promise<string> {
    return 'hello';
  }
}
