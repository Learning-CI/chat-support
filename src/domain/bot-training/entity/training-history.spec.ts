import { Trainer } from './trainer';
import { TrainingHistory } from './training-history';
import {
  InvalidAnswerError,
  InvalidQuestionError,
} from '../../../@shared/error/invalid-name-error';
import {
  InvalidBotIdError,
  InvalidTrainerIdError,
  InvalidTrainingHistoryIdError,
} from '../../../@shared/error/invalid-number-error';

describe('TrainingHistory', () => {
  const TRAINING_HISTORY_ID = 1;
  const BOT_ID = 2;
  const TRAINER_ID = 3;
  let trainer: Trainer;
  let trainingHistory: TrainingHistory;

  beforeEach(() => {
    trainer = new Trainer(TRAINER_ID, 'John Doe');
    trainingHistory = new TrainingHistory(
      TRAINING_HISTORY_ID,
      BOT_ID,
      trainer,
      'What is DDD?',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should set the id, botId, trainer, and question', () => {
      expect(trainingHistory.getId()).toEqual(TRAINING_HISTORY_ID);
      expect(trainingHistory.getBotId()).toEqual(BOT_ID);
      expect(trainingHistory.getTrainer()).toEqual(trainer);
      expect(trainingHistory.getQuestion()).toEqual('What is DDD?');
    });
    it('should throw an error when passing an invalid id', () => {
      expect(
        () => new TrainingHistory(0, BOT_ID, trainer, 'What is DDD?'),
      ).toThrow(InvalidTrainingHistoryIdError);
      expect(
        () => new TrainingHistory(undefined, BOT_ID, trainer, 'What is DDD?'),
      ).toThrow(InvalidTrainingHistoryIdError);
    });

    it('should throw an error when passing an invalid botId', () => {
      expect(
        () =>
          new TrainingHistory(TRAINING_HISTORY_ID, 0, trainer, 'What is DDD?'),
      ).toThrow(InvalidBotIdError);
    });

    it('should throw an error when passing an invalid trainer', () => {
      expect(
        () =>
          new TrainingHistory(
            TRAINING_HISTORY_ID,
            BOT_ID,
            undefined,
            'What is DDD?',
          ),
      ).toThrow(InvalidTrainerIdError);
    });

    it('should throw an error when passing an invalid question', () => {
      expect(
        () => new TrainingHistory(TRAINING_HISTORY_ID, BOT_ID, trainer, 'abc'),
      ).toThrow(InvalidQuestionError);
    });
  });

  describe('registerAnswer', () => {
    it('should set the answer and answeredAt', () => {
      trainingHistory.registerAnswer('Domain-Driven Design');
      expect(trainingHistory.getAnswer()).toEqual('Domain-Driven Design');
      expect(trainingHistory.getAnsweredAt()).toBeInstanceOf(Date);
    });
    it('should throw an error when passing an invalid answer', () => {
      expect(() => trainingHistory.registerAnswer('')).toThrow(
        InvalidAnswerError,
      );
    });
  });

  describe('getters', () => {
    it('should return the id', () => {
      expect(trainingHistory.getId()).toEqual(TRAINING_HISTORY_ID);
    });
    it('should return the botId', () => {
      expect(trainingHistory.getBotId()).toEqual(BOT_ID);
    });
    it('should return the trainer', () => {
      expect(trainingHistory.getTrainer()).toEqual(trainer);
    });
  });
});
