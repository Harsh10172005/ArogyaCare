"use server";

import { firebaseAdmin } from "@/lib/firebase-admin";
import { auth } from "firebase-admin";

interface SignUpResult {
  uid?: string;
  error?: string;
}

export async function signUp(formData: any): Promise<SignUpResult> {
  const { email, password } = formData;
  try {
    const userRecord = await auth(firebaseAdmin).createUser({
      email,
      password,
    });
    return { uid: userRecord.uid };
  } catch (error: any) {
    return { error: error.message };
  }
}