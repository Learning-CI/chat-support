import { DefaultError } from './default.error';

export class EmptyStringError extends DefaultError {
  constructor(key: string) {
    super({
      message: `${key} must not be empty.`,
    });
    this.name = EmptyStringError.name;
    Object.setPrototypeOf(this, EmptyStringError.prototype);
  }
}
