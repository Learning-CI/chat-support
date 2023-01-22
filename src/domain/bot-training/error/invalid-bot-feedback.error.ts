import { EmptyStringError } from '../../../@shared/error/empty-string.error';

export class InvalidBotFeedbackError extends EmptyStringError {
  constructor() {
    super('botFeedback');
    this.name = InvalidBotFeedbackError.name;
    Object.setPrototypeOf(this, InvalidBotFeedbackError.prototype);
  }
}
