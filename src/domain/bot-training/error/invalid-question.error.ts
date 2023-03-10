import { InvalidStringError } from '../../../@shared/error/invalid-string.error';

export class InvalidQuestionError extends InvalidStringError {
  constructor(question: string, minSize: number, maxSize: number) {
    super('question', question, minSize, maxSize);
    this.name = InvalidQuestionError.name;
    Object.setPrototypeOf(this, InvalidQuestionError.prototype);
  }
}
