import { InvalidNumberError } from '../../../@shared/error/invalid-number.error';

export class InvalidTrainingHistoryIdError extends InvalidNumberError {
  constructor(trainingHistoryId: number) {
    super('trainingHistoryId', trainingHistoryId);
    this.name = InvalidTrainingHistoryIdError.name;
    Object.setPrototypeOf(this, InvalidTrainingHistoryIdError.prototype);
  }
}
