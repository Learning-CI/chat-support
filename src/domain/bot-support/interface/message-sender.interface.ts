import { SenderType } from '../enum/sender-type.enum';

export interface MessageSender {
  getId(): number;
  getName(): string;
  getSenderType(): SenderType;
}
