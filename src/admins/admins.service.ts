import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Profile } from 'src/profiles/entities/profile.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private adminsRepository: Repository<Admin>,
    @InjectRepository(Profile)
    private adminProfilesRepository: Repository<Profile>,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const existingAdmin = await this.adminsRepository.findOne({
      where: { id: String(createAdminDto.profileId) },
    });
    if (existingAdmin) {
      throw new NotFoundException(
        `Admin with ID ${createAdminDto.profileId} already exists`,
      );
    }
    return this.adminsRepository.save({
      ...createAdminDto,
      admin_id: String(createAdminDto.profileId),
    });
  }

  async findAll(search?: string) {
    try {
      if (search) {
        return await this.adminsRepository.find({
          where: [{ id: search }, { username: search }, { email: search }],
          relations: ['profile'],
        });
      }
      return await this.adminsRepository.find({
        relations: ['profile'],
      });
    } catch (error) {
      console.log('Error finding admins:', error);
      throw new NotFoundException('Admins not found');
    }
  }

  async findOne(id: number) {
    try {
      const admin = await this.adminsRepository.findOne({
        where: { id: String(id) },
        relations: ['profile'],
      });
      if (!admin) {
        throw new NotFoundException(`Admin with ID ${id} not found`);
      }
      return admin;
    } catch (error) {
      console.log(`Error finding admin with ID ${id}:`, error);
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminsRepository.findOne({
      where: { id: String(id) },
      relations: ['profile'],
    });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    // Update the admin properties
    Object.assign(admin, updateAdminDto);
    // If a profile is provided, update or create it
    if (updateAdminDto.profileId) {
      if (admin.profile) {
        Object.assign(admin.profile, updateAdminDto.profileId);
        await this.adminProfilesRepository.save(admin.profile);
      } else {
        admin.profile = this.adminProfilesRepository.create({
          id: updateAdminDto.profileId,
        });
        await this.adminProfilesRepository.save(admin.profile);
      }
    }
    return this.adminsRepository.save(admin);
  }

  async remove(id: number) {
    const admin = await this.adminsRepository.findOne({
      where: { id: String(id) },
    });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    // Remove the associated profile if it exists
    if (admin.profile) {
      await this.adminProfilesRepository.remove(admin.profile);
    }
    // Remove the admin
    return this.adminsRepository.remove(admin);
  }
}
