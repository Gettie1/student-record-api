import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { AdminLoginsService } from './admin-logins.service';
import { CreateAdminLoginDto } from './dto/create-admin-login.dto';
import { UpdateAdminLoginDto } from './dto/update-admin-login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from '../auth/guards/at.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/profiles/entities/profile.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@ApiTags('Admin Logins')
@ApiBearerAuth('access-token')
@UseGuards(AtGuard, RolesGuard)
@Controller('admin-logins')
export class AdminLoginsController {
  constructor(private readonly adminLoginsService: AdminLoginsService) {}
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createAdminLoginDto: CreateAdminLoginDto) {
    return this.adminLoginsService.create(createAdminLoginDto);
  }
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.adminLoginsService.findAll();
  }
  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminLoginsService.findOne(+id);
  }
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminLoginDto: UpdateAdminLoginDto,
  ) {
    return this.adminLoginsService.update(+id, updateAdminLoginDto);
  }
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminLoginsService.remove(+id);
  }
}
