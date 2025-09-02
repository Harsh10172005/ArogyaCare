
import * as admin from 'firebase-admin';
import { serviceAccount } from './firebase-credentials';

let auth: admin.auth.Auth;

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error: any) {
    console.error('Error initializing Firebase Admin SDK:', error);
    // Throw a more specific error to help with debugging.
    throw new Error(`Failed to initialize Firebase Admin SDK: ${error.message}. Please ensure the src/lib/firebase-credentials.ts file is configured correctly.`);
  }
}

auth = admin.auth();
const firebaseAdmin = admin;

export { auth, firebaseAdmin };
