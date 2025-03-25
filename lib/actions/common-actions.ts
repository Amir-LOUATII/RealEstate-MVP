"use server";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

export const getAuthUser = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    throw new Error("You must be logged in to access this route");
  }
  return user;
};

export const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.role !== UserRole.ADMIN && user.role !== UserRole.ADMIN_GUEST)
    redirect("/");
  return user;
};
