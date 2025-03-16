import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { envs } from '@core/config/envs';
import { PrismaService } from '@db/prisma/prisma.service';
import { JWT_Payload_I } from '@luiexplica/ia-dev-services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly prismaService: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.jwtSecret,
    });
  }

  async validate(payload: JWT_Payload_I) {

    const { email } = payload;

    const auth = await this.prismaService.auth_Ety.findFirst({
      where: {
        email
      }
    })

    if (!auth) {
      throw new UnauthorizedException();
    }

    return payload;

  }
}


