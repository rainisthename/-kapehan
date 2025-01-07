

import admin from 'firebase-admin';

// Initialize Firebase Admin SDK only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://kapehan-production.firebasestorage.app', // Ensure this matches your Firebase storage bucket
  });
} else {
  admin.app();  // Use the default app if already initialized
}

export default admin;  // Export admin for use in other files
