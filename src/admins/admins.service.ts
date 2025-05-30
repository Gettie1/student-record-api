import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { AdminProfile } from 'src/admin-profiles/entities/admin-profile.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private adminsRepository: Repository<Admin>,
    @InjectRepository(AdminProfile)
    private adminProfilesRepository: Repository<AdminProfile>,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const existingAdmin = await this.adminsRepository.findOne({
      where: { admin_id: String(createAdminDto.admin_id) },
    });
    if (existingAdmin) {
      throw new NotFoundException(
        `Admin with ID ${createAdminDto.admin_id} already exists`,
      );
    }
    return this.adminsRepository.save({
      ...createAdminDto,
      admin_id: String(createAdminDto.admin_id),
    });
  }
  async findAll(name?: string) {
    try {
      if (name) {
        return await this.adminsRepository.find({
          where: {
            adminProfile: { first_name: name },
          },
          relations: ['adminProfile'],
        });
      }
      return await this.adminsRepository.find({
        relations: ['adminProfile'],
      });
    } catch (error) {
      console.error('Error fetching admins:', error);
      throw new NotFoundException('Admins not found');
    }
  }

  async findOne(id: number) {
    try {
      const admin = await this.adminsRepository.findOne({
        where: { admin_id: String(id) },
        relations: ['adminProfile'],
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
    // Ensure admin_id is a string if present in updateAdminDto
    const dtoToUpdate = {
      ...updateAdminDto,
      admin_id:
        updateAdminDto.admin_id !== undefined
          ? String(updateAdminDto.admin_id)
          : undefined,
    };
    return await this.adminsRepository.update(
      { admin_id: String(id) },
      dtoToUpdate,
    );
  }

  async remove(id: number) {
    return await this.adminsRepository.delete({
      admin_id: String(id),
    });
  }
}
