import { DefaultError } from '../../../@shared/error/default.error';

export class InvalidConversationContext extends DefaultError {
  constructor(id: string) {
    super({ message: `Invalid conversation context: ${id}`, statusCode: 400 });
    this.name = InvalidConversationContext.name;
    Object.setPrototypeOf(this, InvalidConversationContext.prototype);
  }
}
