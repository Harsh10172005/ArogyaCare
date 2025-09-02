import * as admin from 'firebase-admin';

const firebaseAdminConfig = {
  projectId: "arogyacare-yf3yk",
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

let firebaseAdmin: admin.app.App;

if (!admin.apps.length) {
  firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
    databaseURL: `https://${firebaseAdminConfig.projectId}.firebaseio.com`,
  });
} else {
  firebaseAdmin = admin.app();
}

export { firebaseAdmin };