import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { getUserInfoByEmail } from "./actions/users/action";
import { TAddress } from "./actions/instructor/action";

enum UserRole {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  ADMIN = "admin",
}

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
      phone: string;
      firstName: string;
      lastName: string;
      avatar: string;
      gender: string;
      address: TAddress;
      aboutMe: string;
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
    async session({ session, token }) {
      if (token) {
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
          name: token.name as string,
          email: token.email as string,
        };
      }
      return session;
    },
    async jwt({ token, user, session, trigger }) {
      if (!token.sub) return token;
      try {
        if (user?.email) {
          const existingUser = await getUserInfoByEmail(user.email);
          if (existingUser) {
            Object.assign(token, {
              role: existingUser.role,
              firstName: existingUser.firstName,
              lastName: existingUser.lastName,
              avatar: existingUser.avatar,
              address: existingUser.address,
              gender: existingUser.gender,
              aboutMe: existingUser.aboutMe,
              phone: existingUser.phone,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
