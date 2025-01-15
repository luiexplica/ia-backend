import { GetAuthByEmail_UC } from "./getAuthByEmail.use-case";
import { TempoHandler } from "@core/helpers/TempoHandler";
import { Auth_Ety, Prisma } from "@prisma/client";

export const UpdateLastSession_UC = async (email: string, prisma: Prisma.TransactionClient) => {

  const user = await GetAuthByEmail_UC(email, prisma);

  if (!user) {
    return;
  }

  const lastSession = new TempoHandler().date_now();

  const now_user = await prisma.auth_Ety.update({
    where: {
      email
    },
    data: {
      last_session: lastSession
    }
  })

  return now_user;

}