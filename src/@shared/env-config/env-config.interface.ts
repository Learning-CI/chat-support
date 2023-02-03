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

export interface OpenAiConfig {
  apiKey: string;
  model: string;
  maxTokens: number;
}

export interface EnvConfigService {
  getDatabase(): DatabaseConfig;
  getRedis(): RedisConfig;
  getOpenAi(): OpenAiConfig;
}
