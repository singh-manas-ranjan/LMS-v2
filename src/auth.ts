import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { getAccountByUserId, getUserInfoByEmail } from "./actions/users/action";
import { TAddress } from "./actions/instructor/action";
import { createAuthAccount, signUpAuth } from "./actions/auth/register";
import axios from "axios";

export enum UserRole {
  STUDENT = "student",
  INSTRUCTOR = "instructor",
  ADMIN = "admin",
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      isOAuth: boolean;
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
      await axios.patch(`http://localhost:3131/api/v1/students`, {
        id: user?.id,
        emailVerified: new Date(),
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user) return false;

      if (account?.provider !== "credentials" && user) {
        const names: string[] = user?.name?.split(" ") ?? [];
        const userData = await signUpAuth({
          email: user?.email as string,
          firstName: user?.name?.split(" ")[0] as string,
          lastName: user?.name?.split(" ")[names.length - 1] as string,
          avatar: user?.image as string,
          username: user?.email?.substring(
            0,
            user?.email?.indexOf("@")
          ) as string,
        });
        await createAuthAccount({
          userId: userData.user?._id as string,
          type: account?.type as string,
          provider: account?.provider as string,
          providerAccountId: account?.providerAccountId as string,
          refresh_token: account?.refresh_token as string,
          access_token: account?.access_token as string,
          expires_at: account?.expires_at as number,
          token_type: account?.token_type as string,
          scope: account?.scope as string,
          id_token: account?.id_token as string,
          session_state: account?.session_state as string,
        });
      }

      const existingUser = await getUserInfoByEmail(user?.email as string);
      if (!existingUser) {
        return false;
      }
      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserInfoByEmail(token?.email ?? "");

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.sub = existingUser.id;
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
          isOAuth: token.isOAuth as boolean,
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
  ...authConfig,
});
