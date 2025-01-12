import { AuthService } from './../auth.service';


import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';

import { firstValueFrom } from 'rxjs';
import { envs } from '../../../core/config/envs';

@Injectable()
export class Auth_Guard implements CanActivate {

  constructor(
    // @Inject(NATS_SERVICE) private readonly client: ClientProxy
    private readonly jwtService: JwtService,
    private readonly AuthService: AuthService
  ) {

  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {

      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: envs.jwtSecret
      });

      // const new_token: string = await this.AuthService.signJWT(user)

      const auth = user;

      request['auth_user'] = {
        email: auth.email,
        status: auth.status,
        role: auth.role,
        _id: auth._id,
        token: token
        // created_at: auth.created_at,
        // user: auth.user,
      }


    } catch {

      throw new UnauthorizedException();

    }

    return true;

  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}