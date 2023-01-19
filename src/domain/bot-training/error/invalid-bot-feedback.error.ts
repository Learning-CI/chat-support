import { EmptyStringError } from '../../../@shared/error/empty-string.error';

export class InvalidBotFeedbackError extends EmptyStringError {
  constructor() {
    super('botFeedback');
  }
}
