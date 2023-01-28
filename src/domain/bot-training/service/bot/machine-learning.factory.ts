import { MachineLearningClient } from './machine-learning-client';
import { ChatGpt3 } from './chat-gpt/chat-gpt-bot';

export class MachineLearningFactory {
  constructor(private readonly chatGpt3: ChatGpt3) {}

  async getInstance(): Promise<MachineLearningClient> {
    return this.chatGpt3;
  }
}
