"use server";

import * as auth from "@/auth";
import { loginFormSchema, signUpFormSchema } from "@/schemas/schemas";
import { validateWithZodSchema } from "@/schemas/validation";
import { AuthError } from "next-auth";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { z } from "zod";

export async function signUpWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const validatedData = validateWithZodSchema(signUpFormSchema, {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (validatedData.password !== validatedData.confirmPassword) {
      return {
        error: true,
        message: "Passwords don't match",
        fields: {
          email: validatedData.email,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
        },
      };
    }

    // Add your user creation logic here
    // await createUser(validatedData);

    await auth.signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return {
      success: true,
      message: "Account created successfully!",
    };
  } catch (error) {
    console.log(error);
  }
}
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
): Promise<{
  success?: boolean;
  error?: boolean;
  message?: string;
  fields?: Record<string, string>;
  errors?: Record<string, string>;
}> {
  try {
    // Validate with Zod
    const validatedFields = validateWithZodSchema(loginFormSchema, {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const { email, password } = validatedFields;
    // Sign in with credentials
    const result = await auth.signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result?.ok) {
      return {
        error: true,
        message: "Invalid credentials",
        fields: {
          email: validatedFields.email,
        },
      };
    }

    return { success: true, message: "Login successful" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: true,
            message: "Invalid credentials",
            fields: {
              email: formData.get("email") as string,
            },
          };
        default:
          return {
            error: true,
            message: "Something went wrong",
            fields: {
              email: formData.get("email") as string,
            },
          };
      }
    }

    // Handle validation errors
    if (error instanceof Error && error.name === "ZodError") {
      const zodError = error as z.ZodError;
      const fieldErrors = zodError.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {} as Record<string, string>);

      return {
        error: true,
        message: "Validation failed",
        errors: fieldErrors,
        fields: {
          email: formData.get("email") as string,
        },
      };
    }

    return {
      error: true,
      message: "An unexpected error occurred",
      fields: {
        email: formData.get("email") as string,
      },
    };
  }
}

export async function signOut() {
  try {
    await auth.signOut({ redirectTo: "/" });
    return { success: true, message: "user logged out" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      error: true,
      success: false,
      message: "An unexpected error occurred.",
    };
  }
}
