import { Bot } from '../../bot/entity/bot';
import { InvalidConversationContext } from '../error/invalid-conversation-context.error';
import { MachineLearning } from './machine-learning';

export class MachineLearningBot {
  private id: number;
  private machineLearning: MachineLearning;
  private bot: Bot;
  private trainingActive: boolean;
  private supportingActive: boolean;
  private contextId: string;

  constructor(
    id: number,
    machineLearning: MachineLearning,
    bot: Bot,
    trainingActive = false,
    supportingActive = false,
    contextId: string,
  ) {
    this.id = id;
    this.machineLearning = machineLearning;
    this.bot = bot;
    this.trainingActive = trainingActive;
    this.supportingActive = supportingActive;
    this.contextId = contextId;
  }

  public getId(): number {
    return this.id;
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
    if (id?.length <= 0) {
      throw new InvalidConversationContext(id);
    }
    this.contextId = id;
  }
}
