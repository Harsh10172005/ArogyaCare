"use server";

import { firebaseAuth } from "@/lib/firebase-admin";

interface SignInResult {
  sessionCookie?: string;
  error?: string;
}

// NOTE: This signIn function is a placeholder and not secure for production.
// In a real application, you must verify the user's password or use an ID token from the client.
export async function signIn(formData: any): Promise<SignInResult> {
  const { email, password } = formData;
  try {
    // This is not the recommended way to sign in users for production apps.
    // A client-side sign-in flow that generates an ID token is more secure.
    // However, to make the form work as expected for this demo,
    // we'll attempt to verify the user this way.
    // A common reason for failure here is that password-based sign-in
    // is not directly supported this way in the Admin SDK.
    // We can get the user, but not validate the password.
    const user = await firebaseAuth.getUserByEmail(email);

    // The Admin SDK cannot verify passwords. This is a limitation for security.
    // The placeholder logic below simulates a successful login if the user exists.
    // In a real app, the client would sign in, get an ID token, and send it here.
    
    const placeholderToken = `session_for_${user.uid}_at_${Date.now()}`;

    return { sessionCookie: placeholderToken };
    
  } catch (error: any) {
    console.error("Sign-in error:", error);
    if (error.code === 'auth/user-not-found') {
      return { error: "No account found with that email." };
    }
    // This code is often returned for wrong passwords or other issues when using the Admin SDK improperly for sign-in.
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        return { error: "Invalid credentials provided. Please check your email and password." };
    }
    if(error.code === 'auth/invalid-email') {
        return { error: "Please enter a valid email address." };
    }
    return { error: "An unexpected error occurred during sign-in. Please try again." };
  }
}
