import { Test, TestingModule } from '@nestjs/testing';
import { PasswordChangesService } from './password-changes.service';

describe('PasswordChangesService', () => {
  let service: PasswordChangesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordChangesService],
    }).compile();

    service = module.get<PasswordChangesService>(PasswordChangesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
