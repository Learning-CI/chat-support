import { InvalidNumberError } from '../../../@shared/error/invalid-number.error';

export class InvalidSenderIdError extends InvalidNumberError {
  constructor(senderId: number) {
    super('senderId', senderId);
    this.name = InvalidSenderIdError.name;
    Object.setPrototypeOf(this, InvalidSenderIdError.prototype);
  }
}
