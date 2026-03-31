"use server";

import { hash } from "bcryptjs";
import { AuthError } from "next-auth";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { signUpSchema, signInSchema } from "@/lib/validations";

export type FormActionState = {
  error?: string;
  success?: string;
};

export async function authenticateAction(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Please enter a valid email and password.",
    };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "We couldn't sign you in with those details.",
      };
    }

    throw error;
  }

  return {
    success: "Signed in.",
  };
}

export async function registerUserAction(
  _prevState: FormActionState,
  formData: FormData,
): Promise<FormActionState> {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Please complete all required fields.",
    };
  }

  const email = parsed.data.email.toLowerCase();
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    return {
      error: "An account with this email already exists.",
    };
  }

  const passwordHash = await hash(parsed.data.password, 12);

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email,
      passwordHash,
    },
  });

  try {
    await signIn("credentials", {
      email,
      password: parsed.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Your account was created, but automatic sign-in failed. Please sign in manually.",
      };
    }

    throw error;
  }

  return {
    success: "Account created.",
  };
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function signInWithGoogleAction() {
  await signIn("google", {
    redirectTo: "/dashboard",
  });
}
