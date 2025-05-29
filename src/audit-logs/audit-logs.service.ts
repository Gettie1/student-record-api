import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';
import { AuditLog } from './entities/audit-log.entity';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private AudiLogsRepository: Repository<AuditLog>,
  ) {}
  create(createAuditLogDto: CreateAuditLogDto) {
    return createAuditLogDto;
  }

  findAll() {
    return `This action returns all auditLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auditLog`;
  }

  update(id: number, updateAuditLogDto: UpdateAuditLogDto) {
    return updateAuditLogDto;
  }

  remove(id: number) {
    return `This action removes a #${id} auditLog`;
  }
}
