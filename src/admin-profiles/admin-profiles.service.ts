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
  async create(createAdminProfileDto: CreateAdminProfileDto) {
    try {
      const existingProfile = await this.adminRepository.findOne({
        where: { admin: { email: String(createAdminProfileDto.firstName) } },
        relations: ['admin'],
      });
      if (existingProfile) {
        console.log('Admin profile already exists for this admin.');
        return existingProfile;
      }
      const newProfile = this.adminRepository.create(createAdminProfileDto);
      return this.adminRepository.save(newProfile);
    } catch (error) {
      console.error('Error creating admin profile:', error);
      throw new Error('Failed to create admin profile');
    }
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
