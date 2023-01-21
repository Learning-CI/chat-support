import { TrainingService } from './training.service';

export class TrainingHandlerService {
  // constructor() {} //private readonly trainingService: TrainingService

  async train(data: {
    userId: string;
    question: string;
    answer: string;
  }): Promise<void> {
    console.log({ data });
    return null;
  }
}
