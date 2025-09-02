import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// A helper function to get the auth instance, which includes a check for credentials.
function getFirebaseAuth() {
  if (admin.apps.length === 0) {
    console.log('Firebase admin app not initialized. Initializing...');
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    if (!privateKey || !clientEmail) {
      console.error('Firebase admin credentials (private key or client email) are missing in environment variables.');
      throw new Error("Firebase admin credentials are not configured. Please check your environment variables.");
    }
    
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: 'arogyacare-yf3yk',
          clientEmail: clientEmail,
          // The replace is crucial for parsing the key from the .env file.
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
       console.log('Firebase admin app initialized successfully.');
    } catch (error: any) {
       console.error('Firebase admin initialization error:', error);
       // This will give us more detailed logs if initialization fails for other reasons.
       throw new Error(`Firebase admin initialization failed: ${error.message}`);
    }
  }

  return admin.auth();
}

export const firebaseAuth = getFirebaseAuth();
export const firebaseAdmin = admin; // Exporting the whole admin namespace can be useful
