import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MachineLearning } from '../../../../domain/machine-learning/entity/machine-learning';

@Entity('machine_learning')
export class MachineLearningModel {
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

  static toEntityDomain(model: MachineLearningModel): MachineLearning {
    return new MachineLearning(model.id, model.name);
  }
}
