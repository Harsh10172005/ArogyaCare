import * as admin from 'firebase-admin';

// This function initializes the Firebase Admin SDK.
// It checks if an app is already initialized to prevent re-initialization.
function initializeFirebaseAdmin() {
  // If an app is already initialized, return it.
  if (admin.apps.length > 0) {
    return admin.app();
  }

  // Retrieve credentials from environment variables.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  // Check if all required environment variables are present.
  if (!privateKey || !clientEmail || !projectId) {
    console.error("Firebase admin credentials are not fully configured in .env.local");
    if (!privateKey) console.error("FIREBASE_PRIVATE_KEY is missing.");
    if (!clientEmail) console.error("FIREBASE_CLIENT_EMAIL is missing.");
    if (!projectId) console.error("NEXT_PUBLIC_FIREBASE_PROJECT_ID is missing.");
    // Return null if initialization cannot proceed.
    return null;
  }

  try {
    // Initialize the Firebase Admin SDK with the credentials.
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: projectId,
        clientEmail: clientEmail,
        // The .replace() is crucial for correctly parsing the private key from the .env file.
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

// A getter for the auth instance.
// Throws an error if the Admin SDK has not been initialized.
export const getFirebaseAuth = () => {
  const app = initializeFirebaseAdmin();
  if (!app) {
    throw new Error("Firebase Admin SDK has not been initialized. Check server logs for details. Ensure .env.local is configured correctly.");
  }
  return admin.auth(app);
};

// Export firebase-admin for other potential uses.
export const firebaseAdmin = admin;