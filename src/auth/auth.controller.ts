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
import { ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { AtGuard } from './guards/at.guard'; // Adjust the path if AtGuard is located elsewhere
import { RtGuard } from './guards/rt.guard'; // Make sure this path is correct and RtGuard exists
import {
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
interface RequestWithUser extends Request {
  user: {
    sub: number;
    email: string;
    refreshToken: string;
  };
}
@Controller('auth')
@ApiTags('Auth') // 👈 this is used by Swagger to group the endpoints
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  // @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticates a user and returns access and refresh tokens',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        refreshToken: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  @ApiUnauthorizedResponse({ description: 'Authentication failed' })
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
