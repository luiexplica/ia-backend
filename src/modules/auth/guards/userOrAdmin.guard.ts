import { $Enums } from '@prisma/client';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { extractTokenFromHeader } from "@core/helpers/req.helpers";
import { JWT_Payload_I } from "../interfaces/jwt-payload.interface";
import { User_Role_Enum } from "../interfaces/auth.interface";

import { JwtService } from "@nestjs/jwt";
import { envs } from "@core/config/envs";

@Injectable()
export class UserOrAdmin_Guard implements CanActivate {

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

      const { role, id } = decodedToken;

      return this.isValidUserOrAdmin(role, id, auth_id)

    } catch (error) {

      throw new UnauthorizedException('Invalid token');

    }

  }

  isValidUserOrAdmin(role: User_Role_Enum | $Enums.User_Role_Enum, user: string, auth_id: string): boolean {

    if (role === User_Role_Enum.ADMIN_ROLE || role === User_Role_Enum.SUPPORT_ROLE) return true;
    if (role === User_Role_Enum.CLIENT_ROLE && user === auth_id) return true;

    throw new UnauthorizedException('Invalid token');

  }


}