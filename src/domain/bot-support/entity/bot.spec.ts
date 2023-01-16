import { Bot } from './bot';

describe('Bot', () => {
  let bot: Bot;

  beforeEach(() => {
    bot = new Bot(1, 'John Doe');
  });

  describe('constructor', () => {
    it('should set the id and name', () => {
      expect(bot.getId()).toEqual(1);
      expect(bot.getName()).toEqual('John Doe');
    });
  });
});
