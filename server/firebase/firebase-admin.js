// const admin = require('firebase-admin');
// const serviceAccount = require('./ServiceAccount.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'gs://kapehan-production.firebasestorage.app', // Keep as is
// });

import admin from 'firebase-admin';
// import serviceAccount from './ServiceAccount.json' assert { type: 'json' };

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
