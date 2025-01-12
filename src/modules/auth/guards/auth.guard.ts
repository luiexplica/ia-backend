
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { envs } from '@core/config/envs';
import { extractTokenFromHeader } from '@core/helpers/req.helpers';

@Injectable()
export class Auth_Guard implements CanActivate {

  jwtService = new JwtService();

  constructor(
    // private readonly jwtService: JwtService,
  ) {

  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {

      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: envs.jwtSecret
      });

      const auth = user;

      request['auth_user'] = {
        _id: auth._id,
        email: auth.email,
        status: auth.status,
        role: auth.role,
        token: token,
        user: auth.user,
        created_at: auth.created_at,
      }

    } catch {

      throw new UnauthorizedException();

    }

    return true;

  }


}