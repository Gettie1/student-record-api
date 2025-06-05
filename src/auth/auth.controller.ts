import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn/:id')
  signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto);
  }

  @Get('signOut/:id')
  signOut(@Param('id', ParseIntPipe) id: number) {
    return this.authService.signOut(id.toString());
  }
  @Get('refreshTokens')
  refreshTokens() {
    return this.authService.refreshTokens();
  }
}
