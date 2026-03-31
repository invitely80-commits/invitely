import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { auth } from "@/auth";
import { ensureUserRecord, findUserByEmail } from "@/lib/user-record";

export async function getSessionSafely() {
  try {
    return await auth();
  } catch (error) {
    if (error instanceof AuthError) {
      return null;
    }

    if (
      error instanceof Error &&
      /JWTSessionError|JWEInvalid|no matching decryption secret|JWTSession/i.test(
        `${error.name} ${error.message}`,
      )
    ) {
      return null;
    }

    throw error;
  }
}

export async function getCurrentUser() {
  const session = await getSessionSafely();

  if (!session?.user?.email) {
    return session?.user ?? null;
  }

  try {
    let dbUser = await findUserByEmail(session.user.email);

    if (!dbUser) {
      dbUser = await ensureUserRecord(session.user.email, session.user.name);
    }

    return {
      ...session.user,
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
    };
  } catch (error) {
    console.error("Failed to load current app user", error);
    return session.user ?? null;
  }
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect("/sign-in?callbackUrl=/dashboard");
  }

  return user;
}
