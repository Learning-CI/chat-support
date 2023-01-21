import { IsNotEmpty, IsString } from 'class-validator';

export class QuestionAndAnswerDto implements QuestionAndAnswerInterface {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  answer: string;
}
