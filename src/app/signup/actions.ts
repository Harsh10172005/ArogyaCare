"use server";

import { firebaseAuth } from "@/lib/firebase-admin";

interface SignUpResult {
  uid?: string;
  error?: string;
}

export async function signUp(formData: any): Promise<SignUpResult> {
  const { email, password } = formData;
  try {
    const userRecord = await firebaseAuth.createUser({
      email,
      password,
    });
    return { uid: userRecord.uid };
  } catch (error: any) {
    console.error("Sign-up error:", error.message);
    if (error.code === 'auth/email-already-exists') {
        return { error: 'An account with this email already exists.' };
    }
    return { error: "An unexpected error occurred during sign-up." };
  }
}
