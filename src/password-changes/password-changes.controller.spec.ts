import { Test, TestingModule } from '@nestjs/testing';
import { PasswordChangesController } from './password-changes.controller';
import { PasswordChangesService } from './password-changes.service';

describe('PasswordChangesController', () => {
  let controller: PasswordChangesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordChangesController],
      providers: [PasswordChangesService],
    }).compile();

    controller = module.get<PasswordChangesController>(
      PasswordChangesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
