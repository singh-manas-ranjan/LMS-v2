"use server";

import { TUser } from "@/app/ui/navbar/Navbar";
import { currentUser } from "@/lib/auth-session";
import { getUserByEmail, getUserInfoByEmail } from "./users/action";
import { error } from "console";

export const updateUserInfo = async (data: any) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const userRole = user?.role === "student" ? "students" : "instructors";

  const dbUser = await getUserInfoByEmail(user.email as string);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  try {
    const response = await fetch(`http://localhost:3131/api/v1/${userRole}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return { success: "Profile updated successfully" };
    }
    throw new Error(response.statusText);
  } catch (error) {
    console.error(error);
  }
};

export const updateUserAvatar = async (data: any) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const userRole = user?.role === "student" ? "students" : "instructors";

  const dbUser = await getUserInfoByEmail(user.email as string);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  try {
    const response = await fetch(
      `http://localhost:3131/api/v1/${userRole}/avatar`,
      {
        method: "PATCH",
        body: data,
      }
    );
    if (response.ok) {
      return { success: "Profile updated successfully" };
    }
    throw new Error(response.statusText);
  } catch (error) {
    console.error(error);
  }
};
