import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { getUserInfoByEmail } from "./actions/users/action";
import { TAddress } from "./actions/instructor/action";

export enum UserRole {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  ADMIN = "admin",
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      role: UserRole;
      phone: string;
      firstName: string;
      lastName: string;
      avatar: string;
      gender: string;
      address: TAddress;
      aboutMe: string;
      qualification?: string;
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
    async linkAccount({ user }) {
      // handle linking accounts (if needed)
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserInfoByEmail(token?.email ?? "");

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.firstName = existingUser.firstName;
      token.lastName = existingUser.lastName;
      token.avatar = existingUser.avatar;
      token.address = existingUser.address;
      token.gender = existingUser.gender;
      token.aboutMe = existingUser.aboutMe;
      token.phone = existingUser.phone;
      token.qualification = existingUser.qualification;
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user = {
          ...session.user,
          id: token.sub as string,
          role: token.role as UserRole,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
          avatar: token.avatar as string,
          gender: token.gender as string,
          aboutMe: token.aboutMe as string,
          address: token.address as TAddress,
          phone: token.phone as string,
          email: token.email as string,
          qualification: token.qualification as string,
        };
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
