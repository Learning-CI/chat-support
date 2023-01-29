import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MachineLearningBot } from '../../../../domain/machine-learning/entity/machine-learning-bot';
import { BotModel } from '../../../bot/repository/typeorm/bot.model';
import { MachineLearningModel } from './machine-learning.model';

@Entity('machine_learning_bot')
export class MachineLearningBotModel {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('int', {
    nullable: false,
    name: 'bot_id',
  })
  botId: number;

  @Column('int', {
    nullable: false,
    name: 'machine_learning_id',
  })
  machineLearningId: number;

  @Column('boolean', {
    nullable: false,
    name: 'training_active',
  })
  trainingActive: boolean;

  @Column('boolean', {
    nullable: false,
    name: 'supporting_active',
  })
  supportingActive: boolean;

  @Column('varchar', {
    nullable: true,
    name: 'context_id',
  })
  contextId: string;

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

  @ManyToOne((type) => MachineLearningModel)
  @JoinColumn({ name: 'machine_learning_id' })
  machineLearning: MachineLearningModel;

  @ManyToOne((type) => BotModel)
  @JoinColumn({ name: 'bot_id' })
  bot: BotModel;

  static toEntityDomain(model: MachineLearningBotModel): MachineLearningBot {
    const machineLearning = MachineLearningModel.toEntityDomain(
      model.machineLearning,
    );
    const bot = BotModel.toEntityDomain(model.bot);
    return new MachineLearningBot(
      model.id,
      machineLearning,
      bot,
      model.trainingActive,
      model.supportingActive,
      model.contextId,
    );
  }
}
