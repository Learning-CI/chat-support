import { DefaultError } from './default.error';
export class InvalidStringError extends DefaultError {
  constructor(key: string, value: string, minSize: number, maxSize: number) {
    super({
      message: `Invalid ${key}: ${value}. ${key} must contain more than ${minSize} characters and less than ${maxSize} characters.`,
      statusCode: 400,
    });
    this.name = InvalidStringError.name;
    Object.setPrototypeOf(this, InvalidStringError.prototype);
  }
}
