import { InvalidNameError } from '../../../@shared/error/invalid-name.error';
import { MessageSender } from '../interface/message-sender.interface';
import { SenderType } from '../enum/sender-type.enum';
import { InvalidAskerIdError } from '../error/invalid-asker-id.error';

export class Asker implements MessageSender {
  private readonly MIN_NAME_LENGTH = 5;
  private readonly MAX_NAME_LENGTH = 50;

  private id: number;
  private name: string;

  constructor(id: number, name: string) {
    this.setId(id);
    this.setName(name);
  }

  public getSenderType(): SenderType {
    return SenderType.ASKER;
  }

  private setId(id: number): void {
    if (!id || id <= 0) {
      throw new InvalidAskerIdError(id);
    }
    this.id = id;
  }

  private setName(name: string) {
    if (
      !name ||
      name.length < this.MIN_NAME_LENGTH ||
      name.length > this.MAX_NAME_LENGTH
    ) {
      throw new InvalidNameError(
        name,
        this.MIN_NAME_LENGTH,
        this.MAX_NAME_LENGTH,
      );
    }
    this.name = name;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }
}
