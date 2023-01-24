import { QuestionAndAnswerToTrain } from '../../../event/bot-training-events';
import { BotManager } from '../bot-manager';

export class ChatGpt3 implements BotManager {
  async createNewChat(): Promise<string> {
    return '1';
  }

  async sendQuestionAndAnswer(
    chatId: string,
    data: QuestionAndAnswerToTrain,
  ): Promise<string> {
    return 'hello';
  }
}
