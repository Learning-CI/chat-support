import { InvalidStringError } from '../../../@shared/error/invalid-string.error';

export class InvalidAnswerError extends InvalidStringError {
  constructor(answer: string, minSize: number, maxSize: number) {
    super('Answer', answer, minSize, maxSize);
    this.name = InvalidAnswerError.name;
    Object.setPrototypeOf(this, InvalidAnswerError.prototype);
  }
}
