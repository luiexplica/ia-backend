import { Response_I } from "@luiexplica/ia-dev-services";

export const CreateResponse = <T = any>(response: Response_I<T>): Response_I<T> => {

  return {
   ...response
  };


}