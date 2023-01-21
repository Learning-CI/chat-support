import { Body, Controller, Post } from '@nestjs/common';
import { QuestionAndAnswerDto } from '../../../../domain/bot-training/dto/question-answer.dto';
import { TrainingHandlerService } from '../../../../domain/bot-training/service/training-handler.service';
import { Endpoint } from '../../../../app/endpoint.enum';
import { BotTrainingControllerInterface } from '../../../../app/bot-training/api/bot-training-controller.interface';

@Controller(Endpoint.BOT_TRAINING)
export class BotTrainingController implements BotTrainingControllerInterface {
  constructor(
    private readonly trainingHandlerService: TrainingHandlerService,
  ) {}

  @Post(Endpoint.TRAIN)
  public train(@Body() body: QuestionAndAnswerDto): Promise<void> {
    return this.trainingHandlerService.train({
      userId: '',
      question: body.question,
      answer: body.answer,
    });
  }
}
