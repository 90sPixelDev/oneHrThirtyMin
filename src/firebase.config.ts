import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: 'hr-30min.firebaseapp.com',
	projectId: 'hr-30min',
	storageBucket: 'hr-30min.appspot.com',
	messagingSenderId: '171166078565',
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
