
import * as admin from 'firebase-admin';

// Ensure this file is only run on the server
if (typeof window !== 'undefined') {
  throw new Error('Firebase Admin SDK should only be used on the server.');
}

let auth: admin.auth.Auth;

if (!admin.apps.length) {
  // Use the correct environment variable names for server-side in Next.js
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.error('Firebase Admin SDK Missing Variables:', {
        projectId: !!projectId,
        clientEmail: !!clientEmail,
        privateKey: !!privateKey
    });
    throw new Error('Firebase Admin SDK environment variables are not configured. Please check your .env file and ensure it is in the root directory.');
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: projectId,
        clientEmail: clientEmail,
        // Replace the literal `\n` characters with actual newlines
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error: any) {
    console.error('Error initializing Firebase Admin SDK:', error.message);
    throw new Error(`Failed to initialize Firebase Admin SDK: ${error.message}`);
  }
}

auth = admin.auth();
const firebaseAdmin = admin;

export { auth, firebaseAdmin };
