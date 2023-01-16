export class EmptyStringError extends Error {
  constructor(key: string) {
    super(`${key} must not be empty.`);
  }
}
