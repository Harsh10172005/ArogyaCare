import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return;
  }

  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  
  if (!privateKey || !clientEmail || !projectId) {
    console.error("Firebase admin credentials are not fully configured in environment variables.");
    return;
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: projectId,
        clientEmail: clientEmail,
        // The replace is crucial for parsing the key from the .env file.
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
    console.log('Firebase admin app initialized successfully.');
  } catch (error: any) {
    console.error('Firebase admin initialization error:', error.message);
  }
}

// A getter for the auth instance that can be used by other parts of the app.
export const getFirebaseAuth = () => {
    initializeFirebaseAdmin();
    if (!admin.apps.length) {
        throw new Error("Firebase Admin SDK has not been initialized. Check server logs for details.");
    }
    return admin.auth();
};

export const firebaseAdmin = admin;
