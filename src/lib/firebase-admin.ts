
import * as admin from 'firebase-admin';
import { Buffer } from 'buffer';

// Ensure this file is only run on the server
if (typeof window !== 'undefined') {
  throw new Error('Firebase Admin SDK should only be used on the server.');
}

let auth: admin.auth.Auth;
const firebaseAdmin = admin;

if (!admin.apps.length) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKeyBase64 = process.env.FIREBASE_PRIVATE_KEY_BASE64;

  if (projectId && clientEmail && privateKeyBase64) {
    try {
      const privateKey = Buffer.from(privateKeyBase64, 'base64').toString('utf8');

      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: projectId,
          clientEmail: clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'), // Ensure newlines are correctly formatted
        }),
      });
      console.log('Firebase Admin SDK initialized successfully.');
    } catch (error: any) {
      console.error('Error initializing Firebase Admin SDK:', error.message);
      // We throw an error here to make it clear that initialization failed.
      throw new Error(`Failed to initialize Firebase Admin SDK: ${error.message}`);
    }
  } else {
    // This is a critical error. The app cannot function without these variables.
    throw new Error('Firebase Admin SDK environment variables are not configured. Please check your .env.local file.');
  }
}

// We only get the auth instance after we are sure the app has been initialized.
auth = admin.auth();


export { auth, firebaseAdmin };
