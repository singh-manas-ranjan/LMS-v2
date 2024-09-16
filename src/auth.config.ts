import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LoginSchema } from "@/schemas";

function getApiUrl(callbackUrl: string): string {
  switch (callbackUrl) {
    case "/dashboard":
      return "http://localhost:3131/api/v1/students/login";
    case "/instructor-dashboard":
      return "http://localhost:3131/api/v1/instructors/login";
    case "/admin-dashboard":
    case "/admin":
    case "/home":
      return "http://localhost:3131/api/v1/admin/login";
    default:
      return "";
  }
}

export default {
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        try {
          // Validate credentials
          const validatedFields = LoginSchema.safeParse(credentials);
          if (!validatedFields.success) {
            console.error("Invalid credentials:", validatedFields.error);
            return null;
          }

          const { email, password } = validatedFields.data;

          const callbackUrl = credentials.callbackUrl as string;

          const apiUrl = getApiUrl(callbackUrl as string);

          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            console.error("Failed to fetch user:", response.statusText);
            return null;
          }

          const data = await response.json();
          const user = data.body;

          // Check user validity
          if (!user || !user.password) {
            console.error("Invalid user data:", user);
            return null;
          }

          return user;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
