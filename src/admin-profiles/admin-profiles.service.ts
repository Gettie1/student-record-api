import { Injectable } from '@nestjs/common';
import { CreateAdminProfileDto } from './dto/create-admin-profile.dto';
import { UpdateAdminProfileDto } from './dto/update-admin-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminProfile } from './entities/admin-profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminProfilesService {
  constructor(
    @InjectRepository(AdminProfile)
    private adminRepository: Repository<AdminProfile>,
  ) {}
  create(createAdminProfileDto: CreateAdminProfileDto) {
    return this.adminRepository.save(createAdminProfileDto);
  }

  async findAll(email?: string) {
    if (email) {
      return this.adminRepository.find({
        where: { admin: { email } },
        relations: ['admin'],
      });
    }
    return this.adminRepository.find({ relations: ['admin'] });
  }

  async findOne(id: number): Promise<AdminProfile | undefined> {
    const result = await this.adminRepository.findOne({
      where: { admin_id: id },
      relations: ['admin'],
    });
    return result === null ? undefined : result;
  }

  async update(
    id: number,
    updateAdminProfileDto: UpdateAdminProfileDto,
  ): Promise<AdminProfile | undefined> {
    const adminProfile = await this.adminRepository.findOne({
      where: { admin_id: id },
    });
    if (!adminProfile) {
      return undefined;
    }
    Object.assign(adminProfile, updateAdminProfileDto);
    return this.adminRepository.save(adminProfile);
  }
  async remove(id: number): Promise<void> {
    const adminProfile = await this.adminRepository.findOne({
      where: { admin_id: id },
    });
    if (adminProfile) {
      await this.adminRepository.remove(adminProfile);
    }
  }
}

//   update(id: number, updateAdminProfileDto: UpdateAdminProfileDto) {
//     return updateAdminProfileDto;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} adminProfile`;
//   }
// }
