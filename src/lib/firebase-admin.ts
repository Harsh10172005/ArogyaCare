
import * as admin from 'firebase-admin';
import { Buffer } from 'buffer';

function initializeFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // The private key is now expected to be a Base64 encoded string
  const privateKeyBase64 = process.env.FIREBASE_PRIVATE_KEY_BASE64;

  if (!projectId || !clientEmail || !privateKeyBase64) {
    console.error("Firebase admin environment variables not fully configured.");
    if (!projectId) console.error("NEXT_PUBLIC_FIREBASE_PROJECT_ID is missing.");
    if (!clientEmail) console.error("FIREBASE_CLIENT_EMAIL is missing.");
    if (!privateKeyBase64) console.error("FIREBASE_PRIVATE_KEY_BASE64 is missing.");
    return null;
  }

  try {
    // Decode the Base64 private key back to the original format
    const privateKey = Buffer.from(privateKeyBase64, 'base64').toString('utf8');

    const app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: projectId,
        clientEmail: clientEmail,
        privateKey: privateKey,
      }),
    });
    console.log('Firebase admin app initialized successfully.');
    return app;
  } catch (error: any) {
    console.error('Firebase admin initialization error:', error.message);
    return null;
  }
}

export const getFirebaseAuth = () => {
  const app = initializeFirebaseAdmin();
  if (!app) {
    throw new Error("Firebase Admin SDK has not been initialized. Check server logs for details. Ensure .env.local is configured correctly with the new Base64 format.");
  }
  return admin.auth(app);
};

export const firebaseAdmin = admin;
