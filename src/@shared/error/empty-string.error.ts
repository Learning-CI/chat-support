import { DefaultError } from './default.error';

export class EmptyStringError extends DefaultError {
  constructor(key: string) {
    super({
      message: `${key} must not be empty.`,
      statusCode: 400,
    });
    this.name = EmptyStringError.name;
    Object.setPrototypeOf(this, EmptyStringError.prototype);
  }
}
