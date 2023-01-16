import { InvalidSenderIdError } from '../error/invalid-sender-id.error';
import { InvalidTextMessageError } from '../error/invalid-text.error';
import { MessageSender } from '../interface/message-sender.interface';

export class Message {
  private MIN_TEXT_LENGTH = 3;
  private MAX_TEXT_LENGTH = 1000;

  private id: number;
  private text: string;
  private sender: MessageSender;
  private timestamp: Date;

  constructor(text: string, sender: MessageSender, timestamp: Date) {
    this.setText(text);
    this.setSender(sender);
    this.setTimestamp(timestamp);
  }

  public getId(): number {
    return this.id;
  }

  public getText(): string {
    return this.text;
  }

  public getSender(): MessageSender {
    return this.sender;
  }

  public getTimestamp(): Date {
    return this.timestamp;
  }

  private setText(text: string): void {
    if (
      !text ||
      text.length < this.MIN_TEXT_LENGTH ||
      text.length > this.MAX_TEXT_LENGTH
    ) {
      throw new InvalidTextMessageError(
        text,
        this.MIN_TEXT_LENGTH,
        this.MAX_TEXT_LENGTH,
      );
    }
    this.text = text;
  }

  private setSender(sender: MessageSender): void {
    if (!sender || !sender.getId || sender.getId() <= 0) {
      throw new InvalidSenderIdError(undefined);
    }
    this.sender = sender;
  }

  private setTimestamp(timestamp: Date): void {
    this.timestamp = timestamp;
  }
}
