import { Trainer } from './trainer';
import { InvalidNameError } from '../../../@shared/error/invalid-name-error';

describe('Trainer', () => {
  let trainer: Trainer;

  const NAME = 'John Doe';
  const ID = 1;

  beforeEach(() => {
    trainer = new Trainer(ID, NAME);
  });

  test('should create a trainer with a valid name', () => {
    expect(trainer).toBeDefined();
    expect(trainer.getId()).toBe(ID);
    expect(trainer.getName()).toBe(NAME);
  });

  test('should throw an error when creating a trainer with a name shorter than 3 characters', () => {
    expect(() => new Trainer(2, 'Jo')).toThrow(InvalidNameError);
  });

  test('should throw an error when creating a trainer with a name longer than 20 characters', () => {
    const longName = 'a'.repeat(21);
    expect(() => new Trainer(2, longName)).toThrow(InvalidNameError);
  });

  test("should update the trainer's name with a valid name", () => {
    trainer.changeName('Jane Doe');
    expect(trainer.getName()).toBe('Jane Doe');
  });

  test("should throw an error when updating the trainer's name with an invalid name", () => {
    expect(() => trainer.changeName('J')).toThrow(InvalidNameError);
  });
});
