
import { Session_Auth_I } from "@luiexplica/ia-dev-services";
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const User_Auth = createParamDecorator( (data: unknown, ctx: ExecutionContext): Session_Auth_I => {

        const request = ctx.switchToHttp().getRequest();

        if(!request.auth_user){
            throw new InternalServerErrorException('User auth not found');
        }

        return request.auth_user;

    }
)