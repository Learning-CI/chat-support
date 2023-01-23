export enum EventType {
  QUESTION_AND_ANSWER_TO_TRAIN = 'QUESTION_AND_ANSWER_TO_TRAIN',
}

export interface EventInterface<T> {
  type: EventType;
  date: Date;
  content: T;
}
