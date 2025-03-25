import { prisma } from "./db";

export async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: { email: username },
  });
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}
