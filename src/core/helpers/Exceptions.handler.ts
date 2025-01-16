
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Response_I } from "@core/interfaces/response.interface";
import { CreateResponse } from "./createResponse";

@Injectable()
export class ExceptionsHandler {

  constructor() {
  }

  EmitException(error: any, context?: string) {

    if (this.isResponseStructure(error?.error)) {

      throw new HttpException({
        ...error.error,
        context: context || 'ExceptionsHandler'
      }, error.statusCode);

    } else {

      // Manejar otros tipos de errores o transformar el error en la estructura deseada
      const response = CreateResponse({
        ok: false,
        statusCode: error.statusCode || HttpStatus.BAD_REQUEST || 500,
        message: error.message || 'An unexpected error occurred',
        err: error,
        data: null,
        context: context || 'ExceptionsHandler'
      });
      throw new HttpException(response, response.statusCode);

    }

  }

  // Función de validación para la estructura de respuesta
  isResponseStructure(obj: any): obj is Response_I {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      (typeof obj.ok === 'boolean' || obj.ok === undefined) &&
      (typeof obj.statusCode === 'number' || obj.statusCode === undefined) &&
      (typeof obj.path === 'string' || obj.path === undefined) &&
      (obj.data !== undefined) &&
      (typeof obj.message === 'string' || obj.message === undefined) &&
      (typeof obj.paginator === 'object' || obj.paginator === undefined) &&
      (typeof obj.err === 'object' || obj.err === undefined) &&
      (typeof obj.context === 'string' || obj.context === undefined)
    );
  }

}