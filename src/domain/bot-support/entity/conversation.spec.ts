import { Conversation } from './conversation';
import { Asker } from './asker';
import { Bot } from '../../../@shared/entity/bot';
import { Message } from './message';
import { ConversationStatus } from '../enum/conversation-status.enum';
import { InvalidConversationStatusError } from '../error/invalid-conversation-status.error';
import { createMock } from '@golevelup/ts-jest';

describe('Conversation', () => {
  let conversation: Conversation;
  let bot: Bot;
  let asker: Asker;
  let messages: Message[];
  let currentStatus: ConversationStatus;

  beforeEach(() => {
    bot = createMock<Bot>();
    asker = createMock<Asker>();
    messages = [];
    currentStatus = ConversationStatus.OPEN;
    conversation = new Conversation(1, bot, asker, messages, currentStatus);
  });

  it('should get the conversation id', () => {
    expect(conversation.getId()).toEqual(1);
  });

  it('should get the conversation bot', () => {
    expect(conversation.getBot()).toEqual(bot);
  });

  it('should get the conversation asker', () => {
    expect(conversation.getAsker()).toEqual(asker);
  });

  it('should get the conversation messages', () => {
    expect(conversation.getMessages()).toEqual(messages);
  });

  it('should get the conversation current status', () => {
    expect(conversation.getCurrentStatus()).toEqual(currentStatus);
  });

  it('should throw error when openining a conversation that is already opened', () => {
    expect(() => conversation.openConversation()).toThrow(
      InvalidConversationStatusError,
    );
  });

  it('should throw error when closing a conversation that is already closed', () => {
    conversation.closeConversation();
    expect(() => conversation.closeConversation()).toThrow(
      InvalidConversationStatusError,
    );
  });

  it('should close the conversation', () => {
    conversation.closeConversation();
    expect(conversation.getCurrentStatus()).toEqual(ConversationStatus.CLOSED);
  });

  it('should open the conversation', () => {
    conversation.closeConversation();
    conversation.openConversation();
    expect(conversation.getCurrentStatus()).toEqual(ConversationStatus.OPEN);
  });

  it('should add a message to the conversation', () => {
    const messageText = 'hello people';
    const message = createMock<Message>();
    jest.spyOn(message, 'getText').mockReturnValue(messageText);

    conversation.setMessages([message]);
    expect(conversation.getMessages()).toEqual([message]);
    expect(conversation.getMessages()[0].getText()).toEqual(messageText);
  });
});
