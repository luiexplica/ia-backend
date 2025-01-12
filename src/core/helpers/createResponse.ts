import { Response_I } from "@core/interfaces/response.interface";


export const CreateResponse = (response: Response_I): Response_I => {

  return {
    ok: response.ok,
    statusCode: response.statusCode,
    message: response.message,
    data: response.data,
  };


}