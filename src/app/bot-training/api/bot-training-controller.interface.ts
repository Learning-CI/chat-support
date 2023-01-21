export interface BotTrainingControllerInterface {
  train(body: QuestionAndAnswerInterface): Promise<void>;
}
