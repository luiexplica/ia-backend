import { TempoHandler } from "@core/helpers/TempoHandler";
import { auth_Ety, Prisma } from "@prisma/client";
import { AuthGetByEmail_UC } from "./authGetByEmail.use-case";

export const UpdateLastSession_UC = async (email: string, prisma: Prisma.TransactionClient) => {

  const user = await AuthGetByEmail_UC(email, prisma);

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