import { $Enums } from '@prisma/client';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { extractTokenFromHeader } from "@core/helpers/req.helpers";
import { JWT_Payload_I } from "@auth/interfaces/jwt-payload.interface";
import { User_Role_Enum } from "@auth/interfaces/auth.interface";

import { JwtService } from "@nestjs/jwt";
import { envs } from "@core/config/envs";

@Injectable()
export class SameUser_Guard implements CanActivate {

  jwtService = new JwtService();

  constructor(
  ) {

  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    const auth_id = request.params.auth_id;

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {

      const decodedToken: JWT_Payload_I = this.jwtService.verify( token, {
        secret: envs.jwtSecret,
      } );

      const { id } = decodedToken;

      return this.isValidUserOrAdmin( id, auth_id)

    } catch (error) {

      throw new UnauthorizedException('Invalid token');

    }

  }

  isValidUserOrAdmin( user: string, auth_id: string): boolean {

    if (user === auth_id) return true;

    throw new UnauthorizedException('Invalid token');

  }


}