import { MachineLearning } from './machine-learning';

describe('MachineLearning', () => {
  let machineLearning: MachineLearning;

  beforeEach(() => {
    machineLearning = new MachineLearning(1, 'Test ML');
  });

  it('should create an instance', () => {
    expect(machineLearning).toBeTruthy();
  });

  it('should have the correct id', () => {
    expect(machineLearning.getId()).toEqual(1);
  });

  it('should have the correct name', () => {
    expect(machineLearning.getName()).toEqual('Test ML');
  });
});
