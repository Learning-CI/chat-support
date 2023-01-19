import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { NestEnvConfigService } from '../infrastructure/env-config/nest-env-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/infrastructure/env-config/.env',
    }),
    TypeOrmModule.forRootAsync({
      extraProviders: [NestEnvConfigService],
      imports: [ConfigModule],
      useFactory: (configService: NestEnvConfigService) => {
        const database = configService.getDatabase();
        return {
          ...database,
          type: 'mysql',
          autoLoadEntities: true,
          synchronize: false,
        };
      },
      inject: [NestEnvConfigService],
    }),
  ],
  providers: [
    //NestEnvConfigService,
  ],
  controllers: [AppController],
})
export class AppModule {}
