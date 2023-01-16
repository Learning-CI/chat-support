export class InvalidStringError extends Error {
  constructor(key: string, value: string, minSize: number, maxSize: number) {
    super(
      `Invalid ${key}: ${value}. ${key} must contain more than ${minSize} characters and less than ${maxSize} characters.`,
    );
  }
}

export class EmptyStringError extends Error {
  constructor(key: string) {
    super(`${key} must not be empty.`);
  }
}

export class InvalidNameError extends InvalidStringError {
  constructor(name: string, minSize: number, maxSize: number) {
    super('name', name, minSize, maxSize);
  }
}

export class InvalidQuestionError extends InvalidStringError {
  constructor(question: string, minSize: number, maxSize: number) {
    super('question', question, minSize, maxSize);
  }
}

export class InvalidAnswerError extends EmptyStringError {
  constructor() {
    super('answer');
  }
}
