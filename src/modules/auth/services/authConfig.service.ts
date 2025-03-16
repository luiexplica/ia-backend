import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { envs } from "@core/config/envs";
import { JWT_Payload_I } from "@luiexplica/ia-dev-services";

@Injectable()
export class AuthConfigService {

  constructor(
    private readonly jwtService: JwtService,
  ) { }

  async verify(token: string) {

    const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
      secret: envs.jwtSecret
    });

    return {
      sub,
      iat,
      exp,
      user,
      token: await this.signJWT(user)
    }
  }

  async signJWT(payload: JWT_Payload_I) {
    return this.jwtService.sign(payload)
  }

}