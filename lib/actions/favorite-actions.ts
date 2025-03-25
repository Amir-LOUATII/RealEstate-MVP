"use server";

import { prisma } from "../db";
import { getAuthUser } from "./common-actions";

export async function getCurrentUserFavorites() {
  const user = await getAuthUser();
  const favorites = await prisma.property.findMany({
    where: {
      favoredBy: {
        some: {
          id: user.id,
        },
      },
    },
    include: {
      agent: true,
    },
  });
  return favorites;
}
