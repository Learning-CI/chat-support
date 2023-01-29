export interface MachineLearningClient {
  createContext(): Promise<string>;
  sendPrompt(contextId: string, prompt: string): Promise<string>;
}
