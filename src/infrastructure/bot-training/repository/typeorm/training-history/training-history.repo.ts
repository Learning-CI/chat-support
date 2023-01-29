import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingHistory } from '../../../../../domain/bot-training/entity/training-history';
import { TrainingHistoryRepository } from '../../../../../domain/bot-training/repository/training-history.repository';
import { TrainingHistoryModel } from './training-history.model';

@Injectable()
export class TrainingHistoryRepo implements TrainingHistoryRepository {
  constructor(
    @InjectRepository(TrainingHistoryModel)
    private readonly repo: Repository<TrainingHistoryModel>,
  ) {}

  async create(entity: TrainingHistory): Promise<TrainingHistory> {
    const savedHistory = await this.repo.save({
      question: entity.getQuestion(),
      answer: entity.getAnswer(),
      botId: entity.getBotId(),
      trainerId: entity.getTrainer().getId(),
    });
    return TrainingHistoryModel.toEntityDomain(savedHistory);
  }

  update(entity: TrainingHistory): Promise<TrainingHistory> {
    return null;
  }
  findOne(id: number): Promise<TrainingHistory> {
    return null;
  }
  findAll(): Promise<TrainingHistory[]> {
    return null;
  }
}
