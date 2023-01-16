export class InvalidNumberError extends Error {
  constructor(key: string, value: number) {
    super(`Invalid number for ${key}: ${value}`);
  }
}

export class InvalidBotIdError extends InvalidNumberError {
  constructor(botId: number) {
    super('botId', botId);
  }
}

export class InvalidTrainerIdError extends InvalidNumberError {
  constructor(trainerId: number) {
    super('trainerId', trainerId);
  }
}

export class InvalidTrainingHistoryIdError extends InvalidNumberError {
  constructor(trainingHistoryId: number) {
    super('trainingHistoryId', trainingHistoryId);
  }
}

export class InvalidAskerIdError extends InvalidNumberError {
  constructor(askerId: number) {
    super('askerId', askerId);
  }
}
