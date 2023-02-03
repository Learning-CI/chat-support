import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Bot } from '../../../../domain/bot/entity/bot';

@Entity('bot')
export class BotModel {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'name',
  })
  name: string;

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

  static toEntityDomain(model: BotModel): Bot {
    return new Bot(model.id, model.name);
  }
}
