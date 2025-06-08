import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Query,
  UnauthorizedException,
  Req,
  // HttpStatus,
  // HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { AtGuard } from './guards/at.guard'; // Adjust the path if AtGuard is located elsewhere
import { RtGuard } from './guards/rt.guard'; // Make sure this path is correct and RtGuard exists
interface RequestWithUser extends Request {
  user: {
    sub: number;
    email: string;
    refreshToken: string;
  };
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  // @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto);
  }
  @UseGuards(AtGuard)
  @Get('signOut/:id')
  signOut(@Param('id', ParseIntPipe) id: number) {
    return this.authService.signOut(id.toString());
  }
  @Public()
  @UseGuards(RtGuard)
  @Get('refreshTokens')
  refreshTokens(
    @Query('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    if (user.sub !== id) {
      throw new UnauthorizedException('User ID does not match token ID');
    }
    return this.authService.refreshTokens(id, user.refreshToken);
  }
}
