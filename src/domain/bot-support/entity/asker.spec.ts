import { InvalidNameError } from '../../../@shared/error/invalid-name.error';
import { InvalidAskerIdError } from '../error/invalid-asker-id.error';
import { Asker } from './asker';

type Props = {
  id: number;
  name: string;
  error: string;
};

describe('Asker', () => {
  const TRAINER_ID = 1;
  const TRAINER_NAME = 'John Doe';
  let asker: Asker;

  beforeEach(() => {
    asker = new Asker(TRAINER_ID, TRAINER_NAME);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should set the id and name', () => {
      expect(asker.getId()).toEqual(TRAINER_ID);
      expect(asker.getName()).toEqual(TRAINER_NAME);
    });

    it.each`
      id           | name            | error
      ${0}         | ${TRAINER_NAME} | ${InvalidAskerIdError}
      ${undefined} | ${TRAINER_NAME} | ${InvalidAskerIdError}
    `('should throw an error if id is $id', ({ id, name, error }: Props) => {
      expect(() => {
        new Asker(id, name);
      }).toThrow(error);
    });

    it.each`
      id   | name         | error
      ${1} | ${undefined} | ${InvalidNameError}
      ${1} | ${''}        | ${InvalidNameError}
    `(
      'should throw an error if name is $name',
      ({ id, name, error }: Props) => {
        expect(() => {
          new Asker(id, name);
        }).toThrow(error);
      },
    );
  });
});
