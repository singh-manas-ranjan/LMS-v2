"use server";
import { getUserInfoByEmail } from "../users/action";

export const emailVerification = async (token: string) => {
  //   const user = await getUserInfoByEmail(token);
  //   if (!user) {
  //     return { error: "Invalid token!" };
  //   }
  if (!token) return { error: "Invalid token!" };
  return { success: "Email verified successfully!" };
};

export const getVerificationTokenByEmail = async (email: string) => {};
