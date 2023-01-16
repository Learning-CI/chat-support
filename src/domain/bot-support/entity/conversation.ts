import { Asker } from './asker';
import { Bot } from './bot';
import { ConversationStatus } from '../enum/conversation-status.enum';
import { InvalidConversationStatusError } from '../error/invalid-conversation-status.error';
import { Message } from './message';

export class Conversation {
  private id: number;
  private bot: Bot;
  private asker: Asker;
  private messages: Message[];
  private currentStatus: ConversationStatus;

  constructor(
    id: number,
    bot: Bot,
    asker: Asker,
    messages: Message[],
    currentStatus: ConversationStatus,
  ) {
    this.setId(id);
    this.setBot(bot);
    this.setAsker(asker);
    this.setMessages(messages);
    this.setCurrentStatus(currentStatus);
  }

  public getId(): number {
    return this.id;
  }

  public getBot(): Bot {
    return this.bot;
  }

  public getAsker(): Asker {
    return this.asker;
  }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getCurrentStatus(): ConversationStatus {
    return this.currentStatus;
  }

  public closeConversation(): void {
    if (this.currentStatus === ConversationStatus.CLOSED) {
      throw new InvalidConversationStatusError(ConversationStatus.CLOSED);
    }
    this.setCurrentStatus(ConversationStatus.CLOSED);
  }

  public openConversation(): void {
    if (this.currentStatus === ConversationStatus.OPEN) {
      throw new InvalidConversationStatusError(ConversationStatus.OPEN);
    }
    this.setCurrentStatus(ConversationStatus.OPEN);
  }

  public setMessages(messages: Message[]): void {
    this.messages = messages;
  }

  private setId(id: number): void {
    this.id = id;
  }

  private setBot(bot: Bot): void {
    this.bot = bot;
  }

  private setAsker(asker: Asker): void {
    this.asker = asker;
  }

  private setCurrentStatus(status: ConversationStatus): void {
    if (!this.isStatusValid(status)) {
      throw new InvalidConversationStatusError(status);
    }
    this.currentStatus = status;
  }

  private isStatusValid(status: ConversationStatus): boolean {
    return Object.values(ConversationStatus).includes(status);
  }
}
