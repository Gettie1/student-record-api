import { Module } from '@nestjs/common';
import { PasswordChangesService } from './password-changes.service';
import { PasswordChangesController } from './password-changes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordChange } from './entities/password-change.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([PasswordChange])], // Add any necessary modules here, e.g., TypeOrmModule for database access
  controllers: [PasswordChangesController],
  providers: [PasswordChangesService],
})
export class PasswordChangesModule {}
