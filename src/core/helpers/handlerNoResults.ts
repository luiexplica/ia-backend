import { HttpStatus, HttpException } from "@nestjs/common";
import { CreateResponse } from "./createResponse";


export const handlerNoResults = () => {

 const resp = CreateResponse({
    ok: true,
    data: [],
    statusCode: HttpStatus.OK,
    message: 'No se encontrarón resultados',
  });
  throw new HttpException(resp, resp.statusCode);

}