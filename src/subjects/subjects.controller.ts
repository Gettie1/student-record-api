import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/auth/guards/at.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/profiles/entities/profile.entity';
@ApiTags('Subjects') // 👈 this is used by Swagger to group the endpoints
@ApiBearerAuth('access-token') // 👈 tells Swagger this route uses Bearer toke
@UseGuards(AtGuard, RolesGuard) // 👈 actual runtime protection
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }
  @Roles(Role.ADMIN, Role.STUDENT, Role.GUEST) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }
  @Roles(Role.ADMIN, Role.STUDENT, Role.GUEST) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(+id, updateSubjectDto);
  }
  @Roles(Role.ADMIN) // 👈 this is a custom decorator to check if the user has the ADMIN role
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(+id);
  }
}
