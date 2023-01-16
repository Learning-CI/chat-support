import { EmptyStringError } from '../../../@shared/error/empty-string.error';

export class InvalidAnswerError extends EmptyStringError {
  constructor() {
    super('answer');
  }
}
