import { Injectable } from '@nestjs/common';
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

  findAll() {
    return this.adminLoginRepository.find({
      relations: ['admin'], // Assuming you want to include the related admin entity
    });
  }

  findOne(id: number) {
    return this.adminLoginRepository.findOne({
      where: { admin_id: id },
      relations: ['admin'], // Assuming you want to include the related admin entity
    });
  }

  update(id: number, updateAdminLoginDto: UpdateAdminLoginDto) {
    return this.adminLoginRepository
      .update(id, updateAdminLoginDto)
      .then(() => {
        return this.findOne(id); // Return the updated entity
      });
  }

  remove(id: number) {
    return this.adminLoginRepository.delete(id).then((result) => {
      if (result.affected === 0) {
        throw new Error(`AdminLogin with ID ${id} not found`);
      }
      return { message: `AdminLogin with ID ${id} deleted successfully` };
    });
  }
}
