
import * as admin from 'firebase-admin';

// Ensure this file is only run on the server
if (typeof window !== 'undefined') {
  throw new Error('Firebase Admin SDK should only be used on the server.');
}

let auth: admin.auth.Auth;

if (!admin.apps.length) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  // The private key must be wrapped in quotes in the .env file to preserve newlines.
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.error('Firebase Admin SDK Missing Variables:', {
        projectId: !!projectId,
        clientEmail: !!clientEmail,
        privateKey: !!privateKey
    });
    throw new Error('Firebase Admin SDK environment variables are not configured. Please check your .env file and ensure all required variables are present.');
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: projectId,
        clientEmail: clientEmail,
        // When the private key is correctly quoted in the .env file,
        // we don't need to replace newline characters.
        privateKey: privateKey,
      }),
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error: any) {
    console.error('Error initializing Firebase Admin SDK:', error);
    // Throw a more specific error to help with debugging.
    throw new Error(`Failed to initialize Firebase Admin SDK: ${error.message}. Please ensure the private key in your .env file is correctly formatted and wrapped in double quotes.`);
  }
}

auth = admin.auth();
const firebaseAdmin = admin;

export { auth, firebaseAdmin };
