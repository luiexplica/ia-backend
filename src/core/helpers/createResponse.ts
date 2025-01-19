import { Response_I } from "@core/interfaces/response.interface";


export const CreateResponse = <T = any>(response: Response_I<T>): Response_I<T> => {

  return {
   ...response
  };


}