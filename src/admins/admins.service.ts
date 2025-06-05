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
      where: { id: String(createAdminDto.admin_id) },
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
  async findAll(email?: string) {
    try {
      if (email) {
        return await this.adminsRepository.find({
          where: {
            email: email,
          },
          relations: ['profile'],
        });
      }
      return await this.adminsRepository.find({
        relations: ['profile'],
      });
    } catch (error) {
      console.error('Error fetching admins:', error);
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
    // Ensure admin_id is a string if present in updateAdminDto
    const dtoToUpdate = {
      ...updateAdminDto,
      admin_id:
        updateAdminDto.admin_id !== undefined
          ? String(updateAdminDto.admin_id)
          : undefined,
    };
    return await this.adminsRepository.update({ id: String(id) }, dtoToUpdate);
  }

  async remove(id: number) {
    return await this.adminsRepository.delete({
      id: String(id),
    });
  }
}
