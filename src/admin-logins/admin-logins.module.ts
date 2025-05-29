import { Module } from '@nestjs/common';
import { AdminLoginsService } from './admin-logins.service';
import { AdminLoginsController } from './admin-logins.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminLogin } from './entities/admin-login.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([AdminLogin])],
  controllers: [AdminLoginsController],
  providers: [AdminLoginsService],
})
export class AdminLoginsModule {}
