"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import axios, { AxiosError } from "axios";
import { TUser } from "@/app/ui/navbar/Navbar";
import { generateEmailVerificationToken } from "@/lib/tokens";
import { sendEmail } from "@/lib/mail";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export type TSignUpAuth = {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  username: string;
  emailVerified: Date;
};

export type TAccountAuth = {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
};

export const signUp = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  try {
    await axios.post(`http://localhost:3131/api/v1/students/register`, {
      ...validatedFields.data,
    });
    const verificationToken = await generateEmailVerificationToken(
      values.email
    );

    await sendEmail({
      name: `${values.firstName} ${values.lastName}`,
      email: verificationToken?.email,
      subject: "Verify Your Email",
      content: `<p>Click on the following link to verify your email:</p><p><a href="${baseUrl}/auth/email-verification/?token=${verificationToken?.token}">Verify Email</a></p>`,
    });
    return { success: "Verification email sent!" };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 409) {
      return { error: "User already exists!" };
    }
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const signUpAuth = async (values: TSignUpAuth) => {
  try {
    const user: TUser = await axios
      .post(`http://localhost:3131/api/v1/students/register/auth`, values)
      .then((res) => res.data.body);
    return { success: "Account created successfully!", user };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 409) {
      return { error: "User already exists!" };
    }
    return { error: "Something went wrong!" };
  }
};

export const createAuthAccount = async (values: TAccountAuth) => {
  try {
    const account: TUser = await axios
      .post(`http://localhost:3131/api/v1/users/accounts`, values)
      .then((res) => res.data.body);
    return { success: "Auth account created successfully!", account };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 409) {
      return { error: "User already exists!" };
    }
    return { error: "Something went wrong!" };
  }
};
