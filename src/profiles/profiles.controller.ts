import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  // UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
// import { AtGuard } from 'src/auth/guards/at.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/profiles/entities/profile.entity';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';

// @UseGuards(AtGuard, RolesGuard) // 👈 this is a custom decorator to set roles
@ApiTags('Profiles') // 👈 this is the tag for Swagger UI
@ApiBearerAuth('access-token') // 👈 tells Swagger this route uses Bearer token
@UseInterceptors(CacheInterceptor)
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Public()
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }
  @ApiQuery({
    name: 'Search',
    required: false,
    description: 'Filter profiles by name or other attributes',
    type: String,
  })
  // @Roles(Role.ADMIN) // 👈 this is a custom decorator to set roles for this route
  @Get()
  findAll(@Query('Search') Search?: string) {
    return this.profilesService.findAll(Search);
  }

  // @Roles(Role.ADMIN, Role.STUDENT, Role.GUEST) // 👈 this is a custom decorator to set roles for this route
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.findOne(id.toString());
  }
  // @Roles(Role.ADMIN, Role.STUDENT, Role.GUEST) // 👈 this is a custom decorator to set roles for this route
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.update(id.toString(), updateProfileDto);
  }
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.remove(id.toString());
  }
}
