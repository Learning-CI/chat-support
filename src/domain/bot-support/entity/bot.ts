import { MessageSender } from '../interface/message-sender.interface';
import { SenderType } from '../enum/sender-type.enum';

export class Bot implements MessageSender {
  private id: number;
  private name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public getSenderType(): SenderType {
    return SenderType.BOT;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }
}
