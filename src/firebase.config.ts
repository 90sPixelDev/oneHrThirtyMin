import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBfhjqaChU4p5IWtgBgsUp8pATUc9g5L_Y',
	authDomain: 'hr-30min.firebaseapp.com',
	projectId: 'hr-30min',
	storageBucket: 'hr-30min.appspot.com',
	messagingSenderId: '171166078565',
	appId: '1:171166078565:web:3a604d4578cee9e076988c',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// export const db = getFirestore(app);
