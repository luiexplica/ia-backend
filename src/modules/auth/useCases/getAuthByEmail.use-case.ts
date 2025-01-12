import { EntityManager } from "@mikro-orm/core";
import { Auth_Ety } from "@auth/entities/auth.entity";


export const GetAuthByEmail_UseCase = async (email: string, em: EntityManager): Promise<Auth_Ety | null> => {

  const repository = em.getRepository(Auth_Ety);
  const user = await repository.findOne({ email });
  return user ?? null;

}