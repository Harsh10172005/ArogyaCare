import * as admin from 'firebase-admin';

// This ensures we only initialize the app once, which is important in a
// serverless environment or during development with hot-reloading.
if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    console.error('Firebase admin credentials (private key or client email) are missing in environment variables.');
    // We don't throw an error here during initialization because Next.js might
    // try to load this file in environments where the keys aren't needed yet.
    // The check will happen when an action tries to use the auth service.
  } else {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: 'arogyacare-yf3yk',
          clientEmail: clientEmail,
          // The replace is crucial for parsing the key from the .env file.
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
    } catch (error: any) {
       console.error('Firebase admin initialization error:', error);
       // This will give us more detailed logs if initialization fails for other reasons.
       throw new Error(`Firebase admin initialization failed: ${error.message}`);
    }
  }
}


// A helper function to get the auth instance, which includes a check for credentials.
function getFirebaseAuth() {
  if (!admin.apps.length) {
     throw new Error("Firebase admin is not initialized. Please check your environment variables for FIREBASE_PRIVATE_KEY and FIREBASE_CLIENT_EMAIL.");
  }
  return admin.auth();
}

export const firebaseAuth = getFirebaseAuth();
export const firebaseAdmin = admin; // Exporting the whole admin namespace can be useful
