import { Test, TestingModule } from '@nestjs/testing';
import { AdminLoginsService } from './admin-logins.service';

describe('AdminLoginsService', () => {
  let service: AdminLoginsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminLoginsService],
    }).compile();

    service = module.get<AdminLoginsService>(AdminLoginsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
