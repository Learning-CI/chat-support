import { BotManager } from './bot-manager';
import { ChatGpt3 } from './chat-gpt/chat-gpt-bot';

export class BotManagerFactory {
  constructor(private readonly chatGpt3: ChatGpt3) {}

  async getInstance(): Promise<BotManager> {
    return this.chatGpt3;
  }
}
