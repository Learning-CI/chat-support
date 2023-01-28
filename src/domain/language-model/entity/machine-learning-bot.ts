import { Bot } from '../../bot/entity/bot';
import { MachineLearning } from './machine-learning';

export class MachineLearningBot {
  private machineLearning: MachineLearning;
  private bot: Bot;
  private trainingActive: boolean;
  private supportingActive: boolean;
  private contextId: string;

  constructor(
    machineLearning: MachineLearning,
    bot: Bot,
    trainingActive = false,
    supportingActive = false,
    contextId: string,
  ) {
    this.machineLearning = machineLearning;
    this.bot = bot;
    this.trainingActive = trainingActive;
    this.supportingActive = supportingActive;
    this.contextId = contextId;
  }

  public getMachineLearning(): MachineLearning {
    return this.machineLearning;
  }

  public getBot(): Bot {
    return this.bot;
  }

  public isTrainingActive(): boolean {
    return this.trainingActive;
  }

  public isSupportingActive(): boolean {
    return this.supportingActive;
  }

  public hasConversationContext(): boolean {
    return this.contextId?.length > 0;
  }

  public getConversationContext(): string {
    return this.contextId;
  }

  public saveConversationContext(id: string): void {
    this.contextId = id;
  }
}
