import { InvalidNumberError } from '../../../@shared/error/invalid-number.error';

export class InvalidTrainerIdError extends InvalidNumberError {
  constructor(trainerId: number) {
    super('trainerId', trainerId);
    this.name = InvalidTrainerIdError.name;
    Object.setPrototypeOf(this, InvalidTrainerIdError.prototype);
  }
}
