import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const initFirebaseAdmin = () => {
  const {
    NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
    NEXT_PUBLIC_FIRBASE_CLIENT_EMAIL,
  } = process.env;

  const apps = getApps();

  if (!apps.length) {
    initializeApp({
      credential: cert({
        projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: NEXT_PUBLIC_FIRBASE_CLIENT_EMAIL,
        privateKey: NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
};

export const { auth, db } = initFirebaseAdmin();
