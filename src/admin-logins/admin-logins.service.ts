import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminLoginDto } from './dto/create-admin-login.dto';
import { UpdateAdminLoginDto } from './dto/update-admin-login.dto';
import { AdminLogin } from './entities/admin-login.entity';

@Injectable()
export class AdminLoginsService {
  constructor(
    @InjectRepository(AdminLogin)
    private adminLoginRepository: Repository<AdminLogin>,
  ) {}
  create(createAdminLoginDto: CreateAdminLoginDto) {
    return createAdminLoginDto;
  }

  findAll() {
    return `This action returns all adminLogins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminLogin`;
  }

  update(id: number, updateAdminLoginDto: UpdateAdminLoginDto) {
    return updateAdminLoginDto;
  }

  remove(id: number) {
    return `This action removes a #${id} adminLogin`;
  }
}
