import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Session])], // Add your entities here
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
