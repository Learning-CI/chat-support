import { InvalidNumberError } from '../../../@shared/error/invalid-number.error';

export class InvalidAskerIdError extends InvalidNumberError {
  constructor(askerId: number) {
    super('askerId', askerId);
    this.name = InvalidAskerIdError.name;
    Object.setPrototypeOf(this, InvalidAskerIdError.prototype);
  }
}
