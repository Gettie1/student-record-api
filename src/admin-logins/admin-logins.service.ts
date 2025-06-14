import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminLoginDto } from './dto/create-admin-login.dto';
import { UpdateAdminLoginDto } from './dto/update-admin-login.dto';
import { AdminLogin } from './entities/admin-login.entity';
import { Admin } from 'src/admins/entities/admin.entity';

@Injectable()
export class AdminLoginsService {
  constructor(
    @InjectRepository(AdminLogin)
    private adminLoginRepository: Repository<AdminLogin>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}
  create(createAdminLoginDto: CreateAdminLoginDto) {
    const adminLogin = this.adminLoginRepository.create(createAdminLoginDto);
    return this.adminLoginRepository.save(adminLogin);
  }

  async findAll() {
    const adminLogins = await this.adminLoginRepository.find({
      relations: ['admin'], // Include the related admin entity
    });

    if (!adminLogins || adminLogins.length === 0) {
      throw new NotFoundException('No AdminLogins found');
    }

    return adminLogins;
  }

  async findOne(id: number) {
    const adminLogin = await this.adminLoginRepository.findOne({
      where: { admin_id: id },
      relations: ['admin'],
    });

    if (!adminLogin) {
      throw new NotFoundException(`AdminLogin with ID ${id} not found`);
    }

    return adminLogin;
  }

  async update(id: number, updateAdminLoginDto: UpdateAdminLoginDto) {
    const adminLogin = await this.adminLoginRepository.findOne({
      where: { admin_id: id },
    });

    if (!adminLogin) {
      throw new NotFoundException(`AdminLogin with ID ${id} not found`);
    }

    // Update the properties of the existing entity
    Object.assign(adminLogin, updateAdminLoginDto);

    return this.adminLoginRepository.save(adminLogin);
  }

  remove(id: number) {
    return this.adminLoginRepository.delete(id).then((result) => {
      if (result.affected === 0) {
        throw new NotFoundException(`AdminLogin with ID ${id} not found`);
      }
      return { message: `AdminLogin with ID ${id} deleted successfully` };
    });
  }
}
