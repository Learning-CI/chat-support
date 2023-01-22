import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  EnvConfigService,
  DatabaseConfig,
  RedisConfig,
} from '../../../@shared/env-config/env-config.interface';

@Injectable()
export class NestEnvConfigService implements EnvConfigService {
  constructor(private readonly nestConfig: ConfigService) {}

  getDatabase(): DatabaseConfig {
    return {
      host: this.nestConfig.get('DATABASE_HOST'),
      port: this.nestConfig.get('DATABASE_PORT'),
      username: this.nestConfig.get('DATABASE_USERNAME'),
      password: this.nestConfig.get('DATABASE_PASSWORD'),
      database: this.nestConfig.get('DATABASE_NAME'),
    };
  }

  getRedis(): RedisConfig {
    return {
      host: this.nestConfig.get('REDIS_HOST'),
      port: this.nestConfig.get('REDIS_PORT'),
      password: this.nestConfig.get('REDIS_PASSWORD'),
    };
  }
}
