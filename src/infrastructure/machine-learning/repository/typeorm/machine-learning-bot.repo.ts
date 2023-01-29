import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MachineLearningBot } from '../../../../domain/machine-learning/entity/machine-learning-bot';
import { MachineLearningBotRepository } from '../../../../domain/machine-learning/repository/machine-learning-bot.repository';
import { MachineLearningBotModel } from './machine-learning-bot.model';

@Injectable()
export class MachineLearningBotRepo implements MachineLearningBotRepository {
  constructor(
    @InjectRepository(MachineLearningBotModel)
    private readonly repo: Repository<MachineLearningBotModel>,
  ) {}

  async findAvailableForTraining(botId: number): Promise<MachineLearningBot[]> {
    const machines = await this.repo.find({
      where: {
        botId,
        trainingActive: true,
      },
      relations: ['machineLearning', 'bot'],
    });
    return machines.map((machine) =>
      MachineLearningBotModel.toEntityDomain(machine),
    );
  }

  async create(entity: MachineLearningBot): Promise<MachineLearningBot> {
    return null;
  }

  async update(entity: MachineLearningBot): Promise<MachineLearningBot> {
    const updated = await this.repo.save({ ...entity });
    return MachineLearningBotModel.toEntityDomain(updated);
  }

  findOne(id: number): Promise<MachineLearningBot> {
    return null;
  }

  findAll(): Promise<MachineLearningBot[]> {
    return null;
  }
}
