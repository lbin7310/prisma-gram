import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        // JWT
        const token = generateToken(user.id);
        return token;
      }
      return Error("Wrong email/secret conviation");
    }
  }
};
