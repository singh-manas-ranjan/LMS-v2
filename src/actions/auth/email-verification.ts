"use server";

import axios from "axios";
import { getUserInfoByEmail } from "@/actions/users/action";

export type TEmailVerificationToken = {
  id?: string;
  email: string;
  token: string;
  expires: Date;
};

export const getEmailVerificationTokenByToken = async (
  token: string
): Promise<TEmailVerificationToken | null> => {
  try {
    const emailVerificationToken = await axios
      .post(`http://localhost:3131/api/v1/verification-token/token`, { token })
      .then((res) => res.data.body);
    return emailVerificationToken;
  } catch {
    return null;
  }
};

export const getEmailVerificationTokenByEmail = async (
  email: string
): Promise<TEmailVerificationToken | null> => {
  try {
    const emailVerificationToken = await axios
      .post(`http://localhost:3131/api/v1/verification-token/email`, { email })
      .then((res) => res.data.body);
    return emailVerificationToken;
  } catch {
    return null;
  }
};

export const deleteEmailVerificationTokenByToken = async (token: string) => {
  try {
    return await axios.delete(
      `http://localhost:3131/api/v1/verification-token`,
      { data: { token } }
    );
  } catch {
    return null;
  }
};

export const saveEmailVerificationToken = async (email: string) => {
  try {
    const emailVerificationToken = await axios
      .post(`http://localhost:3131/api/v1/verification-token`, { email })
      .then((res) => res.data.body);
    return emailVerificationToken;
  } catch {
    return null;
  }
};

export const emailVerification = async (token: string) => {
  const existingToken = await getEmailVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token!" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Verification token has expired!" };
  }

  const existingUser = await getUserInfoByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  await axios.patch(`http://localhost:3131/api/v1/students`, {
    id: existingUser._id,
    emailVerified: new Date(),
    email: existingUser.email,
  });

  await deleteEmailVerificationTokenByToken(token);
  return { success: "Email verified successfully!" };
};
