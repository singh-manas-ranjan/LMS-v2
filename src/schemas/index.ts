import * as z from "zod";

const passwordValidation = z
  .string()
  .min(8, { message: "At least 8 characters long." })
  .regex(/\d/, { message: "At least one digit." })
  .regex(/[a-z]/, {
    message: "At least one lowercase letter.",
  })
  .regex(/[A-Z]/, { message: "At least one uppercase letter." })
  .regex(/[^\w\s]/, {
    message: "One special character (e.g., !, @, #, $, %).",
  });

export const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required." }),
});

export const RegisterSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: passwordValidation,
  // confirmPassword: z.string(),
  phone: z.string().min(10, { message: "Phone number is required" }),
  // accountType: z.string().min(1, { message: "Account type is required" }),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  accountType: z.string().min(1, { message: "Account type is required" }),
});

export const NewPasswordSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
