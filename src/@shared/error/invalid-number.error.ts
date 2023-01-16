export class InvalidNumberError extends Error {
  constructor(key: string, value: number) {
    super(`Invalid number for ${key}: ${value}`);
  }
}
