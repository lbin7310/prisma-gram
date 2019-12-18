import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const canSee = await prisma.$exists.room({
        participants_some: {
          id: user.id
        }
      });
      if (canSee) {
        const room = await prisma.room({ id }).$fragment(ROOM_FRAGMENT);
        return room;
      }
      throw Error("You can't see this");
    }
  }
};
