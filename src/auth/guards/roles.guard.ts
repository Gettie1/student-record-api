import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile, Role } from 'src/profiles/entities/profile.entity';
import { JWTPayload } from 'src/auth/strategies/at.strategy';

interface RequestWithUser extends Request {
  user?: JWTPayload;
}
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      'ROLES_KEY',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true; // No roles required, allow access
    }
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user; // Assuming user is set in the request by a previous middleware or guard
    if (!user) {
      return false; // No user found, deny access
    }
    // Fetch the user profile from the database
    const UserProfile = await this.profileRepository.findOne({
      where: { id: user.sub },
      select: ['id', 'role'], // Select only the necessary fields
    });
    if (!UserProfile) {
      return false; // Profile not found, deny access
    }
    return requiredRoles.some((role) => UserProfile.role === role); // Check if the user's role matches any of the required roles
  }
}
