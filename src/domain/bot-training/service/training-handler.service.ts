import { Trainer } from '../entity/trainer';
import { TrainingHistory } from '../entity/training-history';

export class TrainingHandlerService {
  // constructor() {}

  async train(data: {
    userId: string;
    question: string;
    answer: string;
  }): Promise<void> {
    const trainer = new Trainer(1, 'John');
    const history = new TrainingHistory(1, trainer, data.question, data.answer);
    console.log({ history });
  }
}
