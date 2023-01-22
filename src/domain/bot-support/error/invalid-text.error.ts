import { InvalidStringError } from '../../../@shared/error/invalid-string.error';

export class InvalidTextMessageError extends InvalidStringError {
  constructor(text: string, minSize: number, maxSize: number) {
    super('text', text, minSize, maxSize);
    this.name = InvalidTextMessageError.name;
    Object.setPrototypeOf(this, InvalidTextMessageError.prototype);
  }
}
