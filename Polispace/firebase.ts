// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { apiKey, authDomain, projectId, storageBucket, messageSenderId, appId, measurementId } from "./Polispace/keys.js";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messageSenderId,
    appId: appId,
    measurementId: measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const db = getFirestore(app);