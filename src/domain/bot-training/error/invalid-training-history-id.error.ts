import { InvalidNumberError } from '../../../@shared/error/invalid-number.error';

export class InvalidTrainingHistoryIdError extends InvalidNumberError {
  constructor(trainingHistoryId: number) {
    super('trainingHistoryId', trainingHistoryId);
  }
}
