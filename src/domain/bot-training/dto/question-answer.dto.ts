import { QuestionAndAnswerInterface } from '../../../app/bot-training/api/requests/question-answer.interface';

export class QuestionAndAnswerDto implements QuestionAndAnswerInterface {
  // @IsNotEmpty()
  // @IsString()
  question: string;

  // @IsNotEmpty()
  // @IsString()
  answer: string;
}
