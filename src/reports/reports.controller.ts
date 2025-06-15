import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/profiles/entities/profile.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/auth/guards/at.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token') // This will tell Swagger that this route uses Bearer token
@UseGuards(AtGuard, RolesGuard) // This will protect the endpoints with authentication and role-based access control
@ApiTags('Reports') // This will group the endpoints under "Reports" in Swagger UI
@UseInterceptors(CacheInterceptor) // This will enable caching for the endpoints
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }
  @ApiQuery({
    name: 'Search',
    required: false,
    description: 'Filter reports by reportId, reportContent, or student name',
    type: String,
  })
  @UseGuards(AtGuard, RolesGuard) // This will protect the endpoint with authentication and role-based access control
  @Roles(Role.ADMIN, Role.STUDENT, Role.GUEST)
  @Get()
  findAll(@Query('Search') Search?: string) {
    return this.reportsService.findAll(Search);
  }
  @Roles(Role.ADMIN, Role.STUDENT, Role.GUEST)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.findOne(id);
  }
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReportDto: UpdateReportDto,
  ) {
    return this.reportsService.update(id, updateReportDto);
  }
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.remove(id);
  }
}
