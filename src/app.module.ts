import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlunosModule } from './alunos/alunos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AlunosModule,
  ],
})
export class AppModule {}
