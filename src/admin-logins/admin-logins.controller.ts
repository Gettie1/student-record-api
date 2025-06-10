import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminLoginsService } from './admin-logins.service';
import { CreateAdminLoginDto } from './dto/create-admin-login.dto';
import { UpdateAdminLoginDto } from './dto/update-admin-login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from '../auth/guards/at.guard'; // Adjust the path as needed
import { RolesGuard } from '../auth/guards/roles.guard'; // Adjust the path as needed
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/profiles/entities/profile.entity';

@ApiTags('Admin Logins') // 👈 this is used by Swagger to group the endpoints
@ApiBearerAuth('access-token') // 👈 tells Swagger this route uses Bearer token
@UseGuards(AtGuard, RolesGuard) // 👈 actual runtime protection
@Controller('admin-logins')
export class AdminLoginsController {
  constructor(private readonly adminLoginsService: AdminLoginsService) {}
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Post()
  create(@Body() createAdminLoginDto: CreateAdminLoginDto) {
    return this.adminLoginsService.create(createAdminLoginDto);
  }
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Get()
  findAll() {
    return this.adminLoginsService.findAll();
  }
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminLoginsService.findOne(+id);
  }
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminLoginDto: UpdateAdminLoginDto,
  ) {
    return this.adminLoginsService.update(+id, updateAdminLoginDto);
  }
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminLoginsService.remove(+id);
  }
}
