import { EventInterface, EventType } from '../../../@shared/event/event';
import { EventHandler } from '../../../@shared/event/event-handler';
import { QuestionAndAnswerToTrain } from './bot-training-events';

export class BotTrainingEventHandler implements EventHandler {
  async handle(event: EventInterface<any>): Promise<void> {
    switch (event.type) {
      case EventType.QUESTION_AND_ANSWER_TO_TRAIN:
        await this.handleQuestionAndAnswerToTrain(event);
        break;
      default:
        throw new Error(`Event ${event.type} not supported`);
    }
  }

  private async handleQuestionAndAnswerToTrain(
    event: EventInterface<QuestionAndAnswerToTrain>,
  ): Promise<void> {
    console.log({ eventhandler: event });
  }
}
