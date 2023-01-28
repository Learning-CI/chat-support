export interface MachineLearningClient {
  createNewContext(): Promise<string>;
  train(contextId: string, trainingInformation: string): Promise<string>;
}
