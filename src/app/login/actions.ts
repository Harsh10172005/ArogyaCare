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
    // The firebaseAuth getter handles initialization.
    const auth = firebaseAuth;
    
    // The Admin SDK cannot verify passwords directly. 
    // This is a placeholder to check if the user exists.
    // In a real app, the client would sign in (e.g., with signInWithEmailAndPassword), 
    // get an ID token, and send it to the server for verification.
    const user = await auth.getUserByEmail(email);

    // This is a placeholder and does not actually verify the password.
    // We are simulating a successful login if the user exists.
    // DO NOT use this logic in a production environment.
    if (user) {
      // In a real app, you would create a session cookie here after verifying the ID token.
      // For this demo, we'll just return a success-like message.
      const placeholderToken = `session_for_${user.uid}_at_${Date.now()}`;
      return { sessionCookie: placeholderToken };
    } else {
      // This path is unlikely to be hit if getUserByEmail throws an error first.
      return { error: "Invalid credentials." };
    }
    
  } catch (error: any) {
    console.error("Sign-in error:", error);
    if (error.code === 'auth/user-not-found') {
      return { error: "No account found with this email." };
    }
    // This will catch wrong passwords if using a method that verifies them,
    // but with getUserByEmail, it mainly catches not-found errors.
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        return { error: "Invalid credentials provided. Please check your email and password." };
    }
    if(error.code === 'auth/invalid-email') {
        return { error: "Please enter a valid email address." };
    }
    return { error: `An unexpected error occurred during sign-in: ${error.message}` };
  }
}
