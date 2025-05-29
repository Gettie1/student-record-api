import { Test, TestingModule } from '@nestjs/testing';
import { AdminLoginsController } from './admin-logins.controller';
import { AdminLoginsService } from './admin-logins.service';

describe('AdminLoginsController', () => {
  let controller: AdminLoginsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminLoginsController],
      providers: [AdminLoginsService],
    }).compile();

    controller = module.get<AdminLoginsController>(AdminLoginsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
