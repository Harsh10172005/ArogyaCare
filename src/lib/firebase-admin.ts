import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file at the very top
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  
  if (!privateKey || !clientEmail || !projectId) {
    console.error("Firebase admin credentials are not fully configured. Check your .env file.");
    if (!privateKey) console.error("FIREBASE_PRIVATE_KEY is missing.");
    if (!clientEmail) console.error("FIREBASE_CLIENT_EMAIL is missing.");
    if (!projectId) console.error("NEXT_PUBLIC_FIREBASE_PROJECT_ID is missing.");
    // Do not proceed with initialization if credentials are not there.
    return null;
  }

  try {
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: projectId,
        clientEmail: clientEmail,
        // The replace is crucial for parsing the key from the .env file.
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    });
    console.log('Firebase admin app initialized successfully.');
    return app;
  } catch (error: any) {
    console.error('Firebase admin initialization error:', error.message);
    return null;
  }
}

// A getter for the auth instance that can be used by other parts of the app.
export const getFirebaseAuth = () => {
    const app = initializeFirebaseAdmin();
    if (!app) {
        throw new Error("Firebase Admin SDK has not been initialized. Check server logs for details.");
    }
    return admin.auth(app);
};

export const firebaseAdmin = admin;