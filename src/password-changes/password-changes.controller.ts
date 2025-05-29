import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PasswordChangesService } from './password-changes.service';
import { CreatePasswordChangeDto } from './dto/create-password-change.dto';
import { UpdatePasswordChangeDto } from './dto/update-password-change.dto';

@Controller('password-changes')
export class PasswordChangesController {
  constructor(
    private readonly passwordChangesService: PasswordChangesService,
  ) {}

  @Post()
  create(@Body() createPasswordChangeDto: CreatePasswordChangeDto) {
    return this.passwordChangesService.create(createPasswordChangeDto);
  }

  @Get()
  findAll() {
    return this.passwordChangesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passwordChangesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordChangeDto: UpdatePasswordChangeDto,
  ) {
    return this.passwordChangesService.update(+id, updatePasswordChangeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passwordChangesService.remove(+id);
  }
}
