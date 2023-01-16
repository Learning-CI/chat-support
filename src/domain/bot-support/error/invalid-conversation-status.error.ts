import { ConversationStatus } from '../enum/conversation-status.enum';

export class InvalidConversationStatusError extends Error {
  constructor(status: ConversationStatus) {
    super(`Invalid conversation status: ${status}`);
  }
}
