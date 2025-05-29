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

@Controller('admin-logins')
export class AdminLoginsController {
  constructor(private readonly adminLoginsService: AdminLoginsService) {}

  @Post()
  create(@Body() createAdminLoginDto: CreateAdminLoginDto) {
    return this.adminLoginsService.create(createAdminLoginDto);
  }

  @Get()
  findAll() {
    return this.adminLoginsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminLoginsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminLoginDto: UpdateAdminLoginDto,
  ) {
    return this.adminLoginsService.update(+id, updateAdminLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminLoginsService.remove(+id);
  }
}
