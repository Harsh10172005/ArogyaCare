"use server";

import { firebaseAdmin } from "@/lib/firebase-admin";

interface SignInResult {
  sessionCookie?: string;
  error?: string;
}

// NOTE: This signIn function is a placeholder and not secure for production.
// In a real application, you must verify the user's password or use an ID token from the client.
export async function signIn(formData: any): Promise<SignInResult> {
  const { email } = formData;
  try {
    // Get the user to create a session for.
    // In a real app, you'd also verify their password here.
    const user = await firebaseAdmin.auth().getUserByEmail(email);

    // Create a session cookie.
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    // The session cookie is created by making a custom token and then using that
    // in a more complex flow. For this example's simplicity, we are not implementing
    // the full secure flow. This is a placeholder for where that logic would go.
    // In a real app, you would not just return a success message.
    // You would set the cookie in the browser.
    
    // WARNING: This is NOT a real session cookie.
    const placeholderToken = `session_for_${user.uid}_at_${Date.now()}`;

    return { sessionCookie: placeholderToken };
    
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      return { error: "No account found with that email." };
    }
    return { error: error.message };
  }
}
