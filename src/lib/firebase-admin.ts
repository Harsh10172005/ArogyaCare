
import * as admin from 'firebase-admin';
import { Buffer } from 'buffer';

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
          privateKey: privateKey,
        }),
      });
      console.log('Firebase Admin SDK initialized successfully.');
    } catch (error: any) {
      console.error('Error initializing Firebase Admin SDK:', error.message);
    }
  } else {
    console.error('Firebase Admin SDK environment variables not fully configured. Ensure .env.local is set up correctly.');
  }
}

const auth = admin.auth();
const firebaseAdmin = admin;

export { auth, firebaseAdmin };
