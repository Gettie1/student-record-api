import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SeedDataService } from './seed-data.service';

@Controller('seed-data')
export class SeedDataController {
  constructor(private readonly seedDataService: SeedDataService) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  seedData() {
    return this.seedDataService.seedData();
  }
}
