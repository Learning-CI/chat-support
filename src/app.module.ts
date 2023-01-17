import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './api/app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'chat-support',
      autoLoadEntities: true,
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
