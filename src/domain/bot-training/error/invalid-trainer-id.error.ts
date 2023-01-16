import { InvalidNumberError } from '../../../@shared/error/invalid-number.error';

export class InvalidTrainerIdError extends InvalidNumberError {
  constructor(trainerId: number) {
    super('trainerId', trainerId);
  }
}
