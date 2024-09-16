import {
  deleteEmailVerificationTokenByToken,
  getEmailVerificationTokenByEmail,
  saveEmailVerificationToken,
} from "@/actions/auth/email-verification";
import {
  deletePasswordResetTokenByToken,
  getPasswordResetTokenByEmail,
  savePasswordResetToken,
} from "@/actions/auth/reset";

export const generatePasswordResetToken = async (email: string) => {
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await deletePasswordResetTokenByToken(existingToken.token);
  }

  return await savePasswordResetToken(email);
};

export const generateEmailVerificationToken = async (email: string) => {
  const existingToken = await getEmailVerificationTokenByEmail(email);

  if (existingToken) {
    await deleteEmailVerificationTokenByToken(existingToken.token);
  }

  return await saveEmailVerificationToken(email);
};
