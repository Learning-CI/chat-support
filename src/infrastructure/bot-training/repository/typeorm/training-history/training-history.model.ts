import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Trainer } from '../../../../../domain/bot-training/entity/trainer';
import { TrainingHistory } from '../../../../../domain/bot-training/entity/training-history';

@Entity('training_history')
export class TrainingHistoryModel {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'question',
  })
  question: string;

  @Column('varchar', {
    nullable: false,
    name: 'answer',
  })
  answer: string;

  @Column('varchar', {
    nullable: true,
    name: 'bot_feedback',
  })
  botFeedback: string;

  @Column('timestamp', {
    nullable: true,
    name: 'bot_feedback_at',
  })
  botFeedbackAt: Date;

  @Column('int', {
    nullable: false,
    name: 'bot_id',
  })
  botId: number;

  @Column('int', {
    nullable: false,
    name: 'trainer_id',
  })
  trainerId: number;

  @Column('timestamp', {
    default: () => 'current_timestamp',
    name: 'date_created',
  })
  dateCreated: Date;

  @Column('timestamp', {
    nullable: false,
    default: () => 'current_timestamp',
    name: 'date_modified',
  })
  dateModified: Date;

  public toEntityDomain(): TrainingHistory {
    return new TrainingHistory(
      this.botId,
      new Trainer(1, 'zap'),
      this.question,
      this.answer,
    );
  }
}
