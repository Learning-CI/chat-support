import { InvalidNumberError } from '../../../@shared/error/invalid-number.error';

export class InvalidBotIdError extends InvalidNumberError {
  constructor(botId: number) {
    super('botId', botId);
  }
}
