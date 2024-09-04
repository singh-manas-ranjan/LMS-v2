import NextAuth, { type DefaultSession } from "next-auth";
import { TUser } from "./app/ui/navbar/Navbar";
import authConfig from "./auth.config";

enum UserRole {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  ADMIN = "admin",
}

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  events: {
    async linkAccount({ user }) {},
  },
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },

    async session({ session, token }) {
      console.log({ SessionToken: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token }) {
      console.log({ JWTToken: token });
      if (!token.sub) return token;

      const existingUser = {} as TUser;
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
