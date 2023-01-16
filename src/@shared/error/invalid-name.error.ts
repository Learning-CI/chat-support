import { InvalidStringError } from './invalid-string.error';

export class InvalidNameError extends InvalidStringError {
  constructor(name: string, minSize: number, maxSize: number) {
    super('name', name, minSize, maxSize);
  }
}
