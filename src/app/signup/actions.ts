"use server";

import { firebaseAdmin } from "@/lib/firebase-admin";

interface SignUpResult {
  uid?: string;
  error?: string;
}

export async function signUp(formData: any): Promise<SignUpResult> {
  const { email, password } = formData;
  try {
    const userRecord = await firebaseAdmin.auth().createUser({
      email,
      password,
    });
    return { uid: userRecord.uid };
  } catch (error: any) {
    if (error.code === 'auth/email-already-exists') {
        return { error: 'An account with this email already exists.' };
    }
    return { error: error.message };
  }
}
