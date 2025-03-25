
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { envs } from '@core/config/envs';
import { extractTokenFromHeader } from '@core/helpers/req.helpers';
import { Session_Auth_I } from '@luiexplica/ia-dev-services';

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

      (request['auth_user'] as Session_Auth_I) = {
        id: auth.id,
        email: auth.email,
        role: auth.role,
        token: token,
        user: auth.user,
        username: auth.username,
      };

    } catch {

      throw new UnauthorizedException();

    }

    return true;

  }


}