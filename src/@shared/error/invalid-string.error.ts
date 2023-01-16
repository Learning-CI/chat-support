export class InvalidStringError extends Error {
  constructor(key: string, value: string, minSize: number, maxSize: number) {
    super(
      `Invalid ${key}: ${value}. ${key} must contain more than ${minSize} characters and less than ${maxSize} characters.`,
    );
  }
}
