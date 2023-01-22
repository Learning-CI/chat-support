import { QuestionAndAnswerInterface } from './requests/question-answer.interface';

export interface BotTrainingControllerInterface {
  train(body: QuestionAndAnswerInterface): Promise<void>;
}
