import { DefaultError } from './default.error';

export class InvalidNumberError extends DefaultError {
  constructor(key: string, value: number) {
    super({
      message: `Invalid number for ${key}: ${value}`,
      statusCode: 400,
    });
    this.name = InvalidNumberError.name;
    Object.setPrototypeOf(this, InvalidNumberError.prototype);
  }
}
