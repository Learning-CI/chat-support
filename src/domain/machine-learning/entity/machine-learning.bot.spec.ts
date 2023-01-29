import { MachineLearning } from './machine-learning';
import { Bot } from '../../bot/entity/bot';
import { MachineLearningBot } from './machine-learning-bot';

describe('MachineLearningBot', () => {
  let machineLearning: MachineLearning;
  let bot: Bot;
  let machineLearningBot: MachineLearningBot;

  beforeEach(() => {
    machineLearning = new MachineLearning(1, 'ML Model 1');
    bot = new Bot(1, 'Bot 1');
    machineLearningBot = new MachineLearningBot(
      1,
      machineLearning,
      bot,
      true,
      false,
      '123',
    );
  });

  describe('getMachineLearning()', () => {
    it('should return the machine learning instance', () => {
      expect(machineLearningBot.getMachineLearning()).toEqual(machineLearning);
    });
  });

  describe('getBot()', () => {
    it('should return the bot instance', () => {
      expect(machineLearningBot.getBot()).toEqual(bot);
    });
  });

  describe('isTrainingActive()', () => {
    it('should return true if training is active', () => {
      expect(machineLearningBot.isTrainingActive()).toBe(true);
    });
  });

  describe('isSupportingActive()', () => {
    it('should return false if supporting is not active', () => {
      expect(machineLearningBot.isSupportingActive()).toBe(false);
    });
  });

  describe('hasConversationContext()', () => {
    it.each`
      conversation_id | expected
      ${undefined}    | ${false}
      ${null}         | ${false}
      ${''}           | ${false}
      ${'123'}        | ${true}
    `(
      'should return $expected if conversation_id is $conversation_id',
      ({ conversation_id, expected }) => {
        machineLearningBot = new MachineLearningBot(
          1,
          machineLearning,
          bot,
          true,
          false,
          conversation_id,
        );
        expect(machineLearningBot.hasConversationContext()).toBe(expected);
      },
    );
  });

  describe('saveConversationContext()', () => {
    it('should set the contextId', () => {
      machineLearningBot.saveConversationContext('456');
      expect(machineLearningBot.getConversationContext()).toBe('456');
    });
  });
});
