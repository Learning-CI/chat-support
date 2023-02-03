import { Configuration, OpenAIApi } from 'openai';
import { v4 } from 'uuid';
import { OpenAiConfig } from '../../../../@shared/env-config/env-config.interface';
import { MachineLearningClient } from '../../../../domain/bot-training/service/bot/machine-learning-client';

export class ChatGpt3OpenAI implements MachineLearningClient {
  openAi: any;
  model: string;
  maxTokens: number;
  constructor(config: OpenAiConfig) {
    const openAiconfig = new Configuration({ apiKey: config.apiKey });
    this.openAi = new OpenAIApi(openAiconfig);
    this.model = config.model;
    this.maxTokens = config.maxTokens;
  }

  async createContext(): Promise<string> {
    return v4();
  }

  async sendPrompt(contextId: string, prompt: string): Promise<string> {
    const fullPrompt = `${prompt}`;
    const completion = await this.openAi.createCompletion({
      model: this.model,
      prompt: fullPrompt,
      max_tokens: this.maxTokens,
    });
    const response = completion.data.choices[0].text;
    console.log({ fullPrompt, response });
    return response;
  }

  async train(contextId: string, prompt: string): Promise<string> {
    console.log(
      `Training is unecessary for OpenAI GPT-3 because the data will provided in the moment of the request`,
    );
    return null;
  }
}
