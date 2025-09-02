import * as admin from 'firebase-admin';

const getFirebaseAdmin = () => {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const firebaseAdminConfig = {
    projectId: 'arogyacare-yf3yk',
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };
  
  if (!firebaseAdminConfig.privateKey || !firebaseAdminConfig.clientEmail) {
    throw new Error('Firebase admin credentials not found in environment variables.');
  }

  return admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
  });
};

export const firebaseAdmin = getFirebaseAdmin();
