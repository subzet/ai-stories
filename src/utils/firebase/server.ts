import { initializeApp } from "firebase-admin/app";
import admin from 'firebase-admin';
import { getAuth } from "firebase-admin/auth";

const credentials = JSON.parse(
    Buffer.from(import.meta.env.FIREBASE_JSON, 'base64').toString('utf8')
  ) as any;

export const app = initializeApp({
    credential: admin.credential.cert(credentials),
  });

export const getUser = async(cookie?: string) => {
    if (!cookie) {
      return;
    }

    const auth = getAuth(app);
    
    const decodedCookie = await auth.verifySessionCookie(cookie);
    
    if (!decodedCookie) {
      return;
    }
    
    return auth.getUser(decodedCookie.uid);
}