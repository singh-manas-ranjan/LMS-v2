import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { TUser } from "./app/ui/navbar/Navbar";

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
  // events: {
  //   async linkAccount({ user }) {},
  // },
  callbacks: {
    // async signIn({ user, account }) {
    //   return true;
    // },
    // async session({ session, token }) {
    //   console.log({ SessionToken: token });
    // if (token.sub && session.user) {
    //   session.user.id = token.sub;
    // }
    // if (token.role && session.user) {
    //   session.user.role = token.role as UserRole;
    // }
    //   return session;
    // },
    async jwt({ token, user, profile }) {
      console.log({ JWTToken: token });
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
