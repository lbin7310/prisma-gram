import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma.user({ id: user.id }).followings();
      return prisma.posts({
        where: {
          user: {
            id_in: [
              ...following.map(followingUser => followingUser.id),
              user.id
            ]
          }
        },
        orderBy: "caption_DESC"
      });
    }
  }
};
