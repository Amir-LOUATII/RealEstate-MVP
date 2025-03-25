import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compareUserPasswords } from "@/lib/bcrypt";
import {
  adminRoutesPrefix,
  apiAuthPrefix,
  authRoutes,
  DEFAULT_REDIRECT_URL,
  publicRoutes,
} from "@/routes";
import { UserRole } from "@prisma/client";
import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import authConfig from "./auth.config";
import { prisma } from "./lib/db";
import { getUserById, getUserByUsername } from "./lib/userService";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new InvalidLoginError("Invalid credentials");
        }

        const { email, password } = credentials;

        const existentUser = await getUserByUsername(email as string);

        if (!existentUser) {
          throw new InvalidLoginError();
        }
        const currentPassword = existentUser.password;
        if (!currentPassword) throw new InvalidLoginError();
        const isValidPassword = await compareUserPasswords(
          password as string,
          existentUser.password as string
        );

        if (!isValidPassword) {
          throw new InvalidLoginError();
        }

        return {
          id: existentUser.id.toString(),
          email: existentUser.email,
          name: existentUser.name,
          role: existentUser.role as UserRole,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!!existingUser === false) return token;
      token.role = existingUser.role as UserRole;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
      const isAuthRoute = authRoutes.includes(nextUrl.pathname);
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      const isAdminRoute = nextUrl.pathname.startsWith(adminRoutesPrefix);

      if (isApiAuthRoute) {
        return true;
      }

      if (isAuthRoute) {
        return isLoggedIn
          ? Response.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl))
          : true;
      }

      if (isAdminRoute) {
        const userRole = auth?.user?.role;
        const isAdmin = userRole === UserRole.ADMIN;
        const isGuest = userRole === UserRole.ADMIN_GUEST;
        return isAdmin || isGuest
          ? true
          : Response.redirect(new URL("/", nextUrl)); // Redirect unauthorized users
      }
      if (!isLoggedIn && !isPublicRoute) {
        return false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/login",
  },

  debug: process.env.NODE_ENV !== "production",
});
