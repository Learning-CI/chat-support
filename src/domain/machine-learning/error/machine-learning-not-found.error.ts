import { DefaultError } from '../../../@shared/error/default.error';

export class MachineLearningNotFound extends DefaultError {
  constructor(message: string) {
    super({ message, statusCode: 404 });
    this.name = MachineLearningNotFound.name;
    Object.setPrototypeOf(this, MachineLearningNotFound.prototype);
  }
}
