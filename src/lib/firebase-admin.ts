import * as admin from 'firebase-admin';

// Ensure the app is only initialized once
if (!admin.apps.length) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    if (!privateKey || !clientEmail) {
      throw new Error("Firebase admin credentials (FIREBASE_PRIVATE_KEY or FIREBASE_CLIENT_EMAIL) are not configured in environment variables.");
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'arogyacare-yf3yk',
        clientEmail: clientEmail,
        // The replace is crucial for parsing the key from the .env file.
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
    console.log('Firebase admin app initialized successfully.');
  } catch (error: any) {
    console.error('Firebase admin initialization error:', error.message);
    // We are throwing the error here to make it clear that initialization failed.
    // The functions using this will need to handle the case where admin is not initialized.
  }
}

// A getter for the auth instance that can be used by other parts of the app.
// It will throw an error if the app is not initialized, which actions can catch.
export const getFirebaseAuth = () => {
    if (!admin.apps.length) {
        throw new Error("Firebase Admin SDK has not been initialized. Check server logs for details.");
    }
    return admin.auth();
};

export const firebaseAdmin = admin;
