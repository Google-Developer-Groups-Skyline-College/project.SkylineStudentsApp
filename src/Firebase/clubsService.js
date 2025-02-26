// clubsService.js
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs 
} from 'firebase/firestore';
import { app } from './firebaseConfig';

// Initialize Firestore
const db = getFirestore(app);

/**
 * Writes club data to Firestore.
 * @param {object} clubsData - An object containing club information.
 */
export const writeClubsData = async (clubsData) => {
  const clubsCollection = collection(db, 'clubs');

  // Loop over each club (the key is used as the document ID)
  for (const clubName in clubsData) {
    if (clubsData.hasOwnProperty(clubName)) {
      try {
        await setDoc(doc(clubsCollection, clubName), clubsData[clubName]);
        console.log(`Club '${clubName}' added to Firestore.`);
      } catch (error) {
        console.error(`Error adding ${clubName}:`, error);
      }
    }
  }
};

/**
 * Fetches clubs data from Firestore.
 * @returns {Promise<object>} An object with club names as keys and club details as values.
 */
export const fetchClubsData = async () => {
  const clubsCollection = collection(db, 'clubs');
  const snapshot = await getDocs(clubsCollection);
  const clubs = {};

  snapshot.forEach(docSnap => {
    clubs[docSnap.id] = docSnap.data();
  });

  return clubs;
};
