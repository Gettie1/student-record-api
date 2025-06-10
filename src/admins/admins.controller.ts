import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/auth/guards/at.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/profiles/entities/profile.entity';
import { Roles } from 'src/auth/decorators/role.decorator';
@ApiTags('Admins') // 👈 this is used by Swagger to group the endpoints
@ApiBearerAuth('access-token') // 👈 tells Swagger this route uses Bearer token
@UseGuards(AtGuard, RolesGuard) // 👈 actual runtime protection
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter admins by name',
    type: String,
  })
  @Get()
  findAll(@Query('search') Search?: string) {
    return this.adminsService.findAll(Search);
  }
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}
