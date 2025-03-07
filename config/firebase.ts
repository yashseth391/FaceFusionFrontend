// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCkcahZzjgN3nY7PWQnjr5W7CsW9_I38iM",
    authDomain: "expense-tracker-c502f.firebaseapp.com",
    projectId: "expense-tracker-c502f",
    storageBucket: "expense-tracker-c502f.firebasestorage.app",
    messagingSenderId: "361104714890",
    appId: "1:361104714890:web:001b3d84f1970252479173",
    measurementId: "G-94HSVMRW4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})
export const firestore = getFirestore(app);