import {
  deletePasswordResetTokenByToken,
  getPasswordResetTokenByEmail,
  savePasswordResetToken,
} from "@/actions/auth/reset";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
};

export const generatePasswordResetToken = async (email: string) => {
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await deletePasswordResetTokenByToken(existingToken.token);
  }

  return await savePasswordResetToken(email);
};
