
import * as admin from 'firebase-admin';
import { serviceAccount } from './firebase-credentials';

let app: admin.app.App;

if (!admin.apps.length) {
  try {
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error: any) {
    console.error('Error initializing Firebase Admin SDK:', error);
    throw new Error(`Failed to initialize Firebase Admin SDK: ${error.message}. Please ensure the src/lib/firebase-credentials.ts file is configured correctly.`);
  }
} else {
  app = admin.app(); // Get the default app if already initialized
}

const auth: admin.auth.Auth = app.auth();
const firebaseAdmin = admin;

export { auth, firebaseAdmin };
