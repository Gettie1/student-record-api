import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/auth/guards/at.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/profiles/entities/profile.entity';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { UseInterceptors } from '@nestjs/common';

@UseInterceptors(CacheInterceptor) // This is used to cache the responses
@ApiTags('Feedbacks') // This is used by Swagger to group the endpoints
@ApiBearerAuth('access-token') // Tells Swagger this route uses Bearer token
@UseGuards(AtGuard, RolesGuard) // Actual runtime protection
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}
  @Roles(Role.ADMIN) // This is a custom decorator to check if the user has the ADMIN role
  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbacksService.create(createFeedbackDto);
  }
  @Roles(Role.ADMIN, Role.STUDENT, Role.GUEST) // This is a custom decorator to check if the user has the ADMIN role
  @ApiQuery({
    name: 'Search',
    required: false,
    description:
      'Filter feedbacks by user_id, subjectId, feedback, rating, or additional_comments',
    type: String,
  })
  @Get()
  findAll(@Query('Search') Search?: string) {
    return this.feedbacksService.findAll(Search);
  }
  @Roles(Role.ADMIN, Role.STUDENT, Role.GUEST) // This is a custom decorator to check if the user has the ADMIN role
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbacksService.findOne(+id);
  }
  @Roles(Role.ADMIN) // This is a custom decorator to check if the user has the ADMIN role
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.feedbacksService.update(+id, updateFeedbackDto);
  }
  @Roles(Role.ADMIN) // This is a custom decorator to check if the user has the ADMIN role
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbacksService.remove(+id);
  }
}
