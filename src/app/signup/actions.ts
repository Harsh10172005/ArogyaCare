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
    console.error("Sign-up error:", error);
    if (error.code === 'auth/email-already-exists') {
        return { error: 'An account with this email already exists.' };
    }
    if (error.code === 'auth/invalid-email') {
        return { error: 'The email address is not valid.' };
    }
    if (error.code === 'auth/weak-password') {
        return { error: 'The password is too weak. It must be at least 6 characters long.' };
    }
    return { error: "An unexpected error occurred during sign-up." };
  }
}
