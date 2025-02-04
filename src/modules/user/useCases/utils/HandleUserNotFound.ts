
import { HttpStatus, HttpException } from "@nestjs/common";
import { CreateResponse } from "@core/helpers/createResponse";

export const handleUserNotFound = () => {
  const resp = CreateResponse({
    ok: false,
    data: null,
    statusCode: HttpStatus.NOT_FOUND,
    message: 'El usuario no existe',
  });
  throw new HttpException(resp, resp.statusCode);
};
