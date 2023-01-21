import { DefaultError } from '../../../@shared/error/default.error';
import { ConversationStatus } from '../enum/conversation-status.enum';

export class InvalidConversationStatusError extends DefaultError {
  constructor(status: ConversationStatus) {
    super({
      message: `Invalid conversation status: ${status}`,
      statusCode: 400,
    });
    this.name = InvalidConversationStatusError.name;
    Object.setPrototypeOf(this, InvalidConversationStatusError.prototype);
  }
}
