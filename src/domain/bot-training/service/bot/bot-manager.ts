import { QuestionAndAnswerToTrain } from '../../event/bot-training-events';

export interface BotManager {
  createNewChat(): Promise<string>;
  sendQuestionAndAnswer(
    chatId: string,
    data: QuestionAndAnswerToTrain,
  ): Promise<string>;
}
