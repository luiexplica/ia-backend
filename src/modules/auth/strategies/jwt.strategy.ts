import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Auth_ormRepository } from '@auth/entities/auth.repository.service';
import { JWT_Payload_I } from '@auth/interfaces/jwt-payload.interface';
import { envs } from '@core/config/envs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly _AuthRepositoryService: Auth_ormRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.jwtSecret,
    });
  }

  async validate(payload: JWT_Payload_I) {

    const { email } = payload;

    const user = await this._AuthRepositoryService.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;

  }
}


