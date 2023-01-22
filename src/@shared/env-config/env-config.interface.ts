export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  password: string;
}

export interface EnvConfigService {
  getDatabase(): DatabaseConfig;
  getRedis(): RedisConfig;
}
