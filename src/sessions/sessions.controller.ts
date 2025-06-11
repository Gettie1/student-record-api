import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AtGuard } from '../auth/guards/at.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator'; // <-- Add this import
import { Role } from 'src/profiles/entities/profile.entity';
import { CacheInterceptor } from '@nestjs/cache-manager'; // Uncomment if you want to use caching
import { UseInterceptors } from '@nestjs/common'; // Import UseInterceptors for caching responses
@UseInterceptors(CacheInterceptor) // 👈 this is used to cache the responses, uncomment if needed
@ApiTags('Sessions') // 👈 this is used by Swagger to group the endpoint
@ApiBearerAuth('access-token') // 👈 tells Swagger this route uses Bearer token
@UseGuards(AtGuard, RolesGuard) // 👈 actual runtime protection
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }
  @Roles(Role.ADMIN, Role.STUDENT, Role.GUEST) // 👈 this is a custom decorator to set roles for this route
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(+id);
  }
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to set roles for this route
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(+id, updateSessionDto);
  }
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to set roles for this route
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(+id);
  }
}
