import { Trainer } from './trainer';
import { InvalidQuestionError } from '../error/invalid-question.error';
import { InvalidAnswerError } from '../error/invalid-answer.error';
import { InvalidTrainingHistoryIdError } from '../error/invalid-training-history-id.error';
import { InvalidBotIdError } from '../error/invalid-bot-id.error';
import { InvalidTrainerIdError } from '../error/invalid-trainer-id.error';

export class TrainingHistory {
  private readonly MIN_QUESTION_LENGTH = 5;
  private readonly MAX_QUESTION_LENGTH = 1000;

  private id: number;
  private botId: number;
  private trainer: Trainer;
  private question: string;
  private answer?: string;
  private answeredAt?: Date;

  constructor(id: number, botId: number, trainer: Trainer, question: string) {
    this.setId(id);
    this.setBotId(botId);
    this.setTrainer(trainer);
    this.setQuestion(question);
  }

  public registerAnswer(answer: string): void {
    this.setAnswer(answer);
    this.answeredAt = new Date();
  }

  private setId(id: number): void {
    if (this.isInvalidNumberId(id)) {
      throw new InvalidTrainingHistoryIdError(id);
    }
    this.id = id;
  }

  private setBotId(botId: number) {
    if (this.isInvalidNumberId(botId)) {
      throw new InvalidBotIdError(botId);
    }
    this.botId = botId;
  }

  private setTrainer(trainer: Trainer) {
    const trainerId = trainer?.getId();
    if (this.isInvalidNumberId(trainerId)) {
      throw new InvalidTrainerIdError(trainerId);
    }
    this.trainer = trainer;
  }

  private setQuestion(question: string) {
    if (
      !question ||
      question.length < this.MIN_QUESTION_LENGTH ||
      question.length > this.MAX_QUESTION_LENGTH
    ) {
      throw new InvalidQuestionError(
        question,
        this.MIN_QUESTION_LENGTH,
        this.MAX_QUESTION_LENGTH,
      );
    }
    this.question = question;
  }

  private setAnswer(answer: string) {
    if (!answer || answer.length <= 0) {
      throw new InvalidAnswerError();
    }
    this.answer = answer;
  }

  private isInvalidNumberId(number: number) {
    return !number || number <= 0;
  }

  public getId(): number {
    return this.id;
  }

  public getBotId(): number {
    return this.botId;
  }

  public getTrainer(): Trainer {
    return this.trainer;
  }

  public getQuestion(): string {
    return this.question;
  }

  public getAnswer(): string {
    return this.answer;
  }

  public getAnsweredAt(): Date {
    return this.answeredAt;
  }
}
