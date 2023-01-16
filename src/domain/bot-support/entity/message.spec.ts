import { createMock } from '@golevelup/ts-jest';
import { InvalidTextMessageError } from '../error/invalid-text.error';
import { Message } from './message';
import { MessageSender } from '../interface/message-sender.interface';
import { InvalidSenderIdError } from '../error/invalid-sender-id.error';

describe('Message', () => {
  const SENDER_ID = 1;
  const text = 'hello people';
  let sender: MessageSender;
  let timestamp: Date;
  let message: Message;

  beforeEach(() => {
    sender = createMock<MessageSender>();
    jest.spyOn(sender, 'getId').mockReturnValue(SENDER_ID);
    timestamp = new Date();
    message = new Message(text, sender, timestamp);
  });

  describe('constructor', () => {
    it('should set the text, sender, and timestamp', () => {
      expect(message.getText()).toEqual(text);
      expect(message.getSender()).toEqual(sender);
      expect(message.getTimestamp()).toEqual(timestamp);
    });

    it.each`
      text                | sender                | timestamp    | error
      ${'hi'}             | ${sender}             | ${timestamp} | ${InvalidTextMessageError}
      ${'a'.repeat(2000)} | ${sender}             | ${timestamp} | ${InvalidTextMessageError}
      ${text}             | ${undefined}          | ${timestamp} | ${InvalidSenderIdError}
      ${text}             | ${{}}                 | ${timestamp} | ${InvalidSenderIdError}
      ${text}             | ${{ getId: () => 0 }} | ${timestamp} | ${InvalidSenderIdError}
    `(
      'should throw an error for text: $text, sender: $sender, or timestamp: $timestamp is invalid',
      ({ text, sender, timestamp, error }) => {
        expect(() => new Message(text, sender, timestamp)).toThrow(error);
      },
    );
  });
});
