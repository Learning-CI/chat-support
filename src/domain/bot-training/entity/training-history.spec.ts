import { Trainer } from './trainer';
import { TrainingHistory } from './training-history';
import {} from '../../../@shared/error/invalid-string.error';
import { InvalidQuestionError } from '../error/invalid-question.error';
import { InvalidBotIdError } from '../error/invalid-bot-id.error';
import { InvalidTrainerIdError } from '../error/invalid-trainer-id.error';
import { InvalidBotFeedbackError } from '../error/invalid-bot-feedback.error';

describe('TrainingHistory', () => {
  const BOT_ID = 2;
  const TRAINER_ID = 3;
  let trainer: Trainer;
  let trainingHistory: TrainingHistory;

  beforeEach(() => {
    trainer = new Trainer(TRAINER_ID, 'John Doe');
    trainingHistory = new TrainingHistory(
      BOT_ID,
      trainer,
      'What is DDD?',
      'DDD is Domain Driven Design',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should set the id, botId, trainer, and question', () => {
      expect(trainingHistory.getBotId()).toEqual(BOT_ID);
      expect(trainingHistory.getTrainer()).toEqual(trainer);
      expect(trainingHistory.getQuestion()).toEqual('What is DDD?');
    });

    it('should throw an error when passing an invalid botId', () => {
      expect(
        () =>
          new TrainingHistory(
            0,
            trainer,
            'What is DDD?',
            'DDD is Domain Driven Design',
          ),
      ).toThrow(InvalidBotIdError);
    });

    it('should throw an error when passing an invalid trainer', () => {
      expect(
        () =>
          new TrainingHistory(
            BOT_ID,
            undefined,
            'What is DDD?',
            'DDD is Domain Driven Design',
          ),
      ).toThrow(InvalidTrainerIdError);
    });

    it('should throw an error when passing an invalid question', () => {
      expect(
        () => new TrainingHistory(BOT_ID, trainer, 'que', 'answer example'),
      ).toThrow(InvalidQuestionError);
    });
  });

  describe('registerAnswer', () => {
    it('should set the answer and answeredAt', () => {
      trainingHistory.registerBotFeedback('I learned how to answer questions');
      expect(trainingHistory.getBotFeedback()).toEqual(
        'I learned how to answer questions',
      );
      expect(trainingHistory.getBotFeedbackAt()).toBeInstanceOf(Date);
    });
    it('should throw an error when passing an invalid answer', () => {
      expect(() => trainingHistory.registerBotFeedback('')).toThrow(
        InvalidBotFeedbackError,
      );
    });
  });

  describe('getters', () => {
    it('should return the botId', () => {
      expect(trainingHistory.getBotId()).toEqual(BOT_ID);
    });
    it('should return the trainer', () => {
      expect(trainingHistory.getTrainer()).toEqual(trainer);
    });
  });
});
