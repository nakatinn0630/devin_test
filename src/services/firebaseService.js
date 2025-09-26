import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export class LocationDataService {
  constructor() {
    this.locationsCollection = 'locations';
  }

  async saveNewLocation(location) {
    try {
      const docRef = await addDoc(collection(db, this.locationsCollection), {
        ...location,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving location:', error);
      throw error;
    }
  }

  async getUserSavedLocations(userId) {
    try {
      const q = query(
        collection(db, this.locationsCollection),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      const locations = [];
      querySnapshot.forEach((doc) => {
        locations.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return locations;
    } catch (error) {
      console.error('Error getting locations:', error);
      return [];
    }
  }

  async signInAnonymously() {
    try {
      const result = await signInAnonymously(auth);
      return result.user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }
}

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
