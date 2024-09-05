"use server";
import { signOut } from "@/auth";

const logout = async () => {
  try {
    await signOut({
      redirect: true,
      redirectTo: "/",
    });
  } catch (error) {
    throw error;
  }
};

export { logout };
