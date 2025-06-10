import { Module } from '@nestjs/common';
import { AdminLoginsService } from './admin-logins.service';
import { AdminLoginsController } from './admin-logins.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminLogin } from './entities/admin-login.entity';
import { Admin } from 'src/admins/entities/admin.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([AdminLogin, Admin])],
  controllers: [AdminLoginsController],
  providers: [AdminLoginsService],
})
export class AdminLoginsModule {}
