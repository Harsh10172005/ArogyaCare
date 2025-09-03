
import * as admin from 'firebase-admin';
import { serviceAccount } from './firebase-credentials';

const APP_NAME = 'arogyacare-app';

let app: admin.app.App;

try {
  // Try to get the existing app instance
  app = admin.app(APP_NAME);
} catch (error) {
  // If the app doesn't exist, initialize it.
  try {
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    }, APP_NAME);
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (initError: any) {
    console.error('Error initializing Firebase Admin SDK:', initError);
    // This will provide a more helpful error if credentials are the issue.
    throw new Error(`Failed to initialize Firebase Admin SDK: ${initError.message}. Please ensure the src/lib/firebase-credentials.ts file is configured correctly.`);
  }
}

const auth: admin.auth.Auth = app.auth();
const firebaseAdmin = admin;

export { auth, firebaseAdmin };
