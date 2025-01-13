import { EntityManager } from "@mikro-orm/core";
import { GetAuthByEmail_UC } from "./getAuthByEmail.use-case";
import { Auth_Ety } from "@auth/entities/auth.entity";
import { TempoHandler } from "@core/helpers/TempoHandler";



export const UpdateLastSession_UC = async (email: string, em: EntityManager): Promise<Auth_Ety> => {

  const user = await GetAuthByEmail_UC(email, em);
  const repository = em.getRepository(Auth_Ety);

  if (!user) {
    return;
  }

  const lastSession = new TempoHandler().date_now();

  const now_user = await repository.update_auth({
    find: {
      _id: user._id
    },
    update: {
      lastSession
    },
    _em: em
  });

  return now_user;

}