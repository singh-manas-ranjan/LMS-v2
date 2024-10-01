"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getUserInfoByEmail } from "../users/action";
import { generateEmailVerificationToken } from "@/lib/tokens";
import { sendEmail } from "@/lib/mail";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password } = validatedFields.data;

  const existingUser = await getUserInfoByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid Credentials!" };
  }

  if (!existingUser.emailVerified && callbackUrl === "/dashboard") {
    const verificationToken = await generateEmailVerificationToken(
      existingUser.email
    );
    await sendEmail({
      name: `${existingUser.firstName} ${existingUser.lastName}`,
      email: verificationToken?.email,
      subject: "Verify Your Email",
      content: `<p>Click on the following link to verify your email:</p><p><a href="${baseUrl}/auth/email-verification/?token=${verificationToken?.token}">Verify Email</a></p>`,
    });
    return { success: "Please check your email for the verification link!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || "/auth/account-type",
    });
    return { success: "Logged in successfully!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "An unexpected error occurred!" };
      }
    }
    throw error;
  }
};
