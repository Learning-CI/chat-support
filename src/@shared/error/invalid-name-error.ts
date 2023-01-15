export class InvalidNameError extends Error {
  constructor(name: string, minSize: number, maxSize: number) {
    super(
      `Invalid name: ${name}. Name must contain more than ${minSize} characters and less than ${maxSize} characters.`,
    );
  }
}
