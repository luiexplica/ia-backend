import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWT_Payload_I } from "@auth/interfaces/jwt-payload.interface";
import { envs } from "@core/config/envs";

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