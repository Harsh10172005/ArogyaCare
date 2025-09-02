"use server";

import { getFirebaseAuth } from "@/lib/firebase-admin";

interface SignUpResult {
  uid?: string;
  error?: string;
}

export async function signUp(formData: any): Promise<SignUpResult> {
  try {
    const auth = getFirebaseAuth();
    const { email, password } = formData;
    const userRecord = await auth.createUser({
      email,
      password,
    });
    return { uid: userRecord.uid };
  } catch (error: any) {
    console.error("Sign-up error:", error);
    let errorMessage = "An unexpected error occurred during sign up.";

    if (error && error.code) {
        switch (error.code) {
            case 'auth/email-already-exists':
                errorMessage = 'An account with this email already exists.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'The email address is not valid.';
                break;
            case 'auth/weak-password':
                errorMessage = 'The password is too weak. It must be at least 6 characters long.';
                break;
            default:
                 errorMessage = `An unexpected error occurred: ${error.message}`;
        }
    } else if (error && error.message) {
        errorMessage = error.message;
    }

    return { error: errorMessage };
  }
}
