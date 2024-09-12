"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import axios, { AxiosError } from "axios";

export const signUp = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  try {
    await axios.post(`http://localhost:3131/api/v1/students/register`, {
      ...validatedFields.data,
    });
    return { success: "Account created successfully!" };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 409) {
      return { error: "User already exists!" };
    }
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export type TSignUpAuth = {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  username: string;
};

export const signUpAuth = async (values: TSignUpAuth) => {
  try {
    await axios.post(
      `http://localhost:3131/api/v1/students/register/auth`,
      values
    );
    return { success: "Account created successfully!" };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 409) {
      return { error: "User already exists!" };
    }
    return { error: "Something went wrong!" };
  }
};
