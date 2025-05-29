import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePasswordChangeDto } from './dto/create-password-change.dto';
import { UpdatePasswordChangeDto } from './dto/update-password-change.dto';
import { PasswordChange } from './entities/password-change.entity';

@Injectable()
export class PasswordChangesService {
  constructor(
    @InjectRepository(PasswordChange)
    private passwordChangesRepository: Repository<PasswordChange>,
  ) {}

  create(createPasswordChangeDto: CreatePasswordChangeDto) {
    return createPasswordChangeDto;
  }

  findAll() {
    return `This action returns all passwordChanges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passwordChange`;
  }

  update(id: number, updatePasswordChangeDto: UpdatePasswordChangeDto) {
    return updatePasswordChangeDto;
  }

  remove(id: number) {
    return `This action removes a #${id} passwordChange`;
  }
}
