import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
// import {...} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCT2A5ZTsk9fz_YTVUYJLfrKDQzNRugkXk",
    authDomain: "skylinestudentsapp.firebaseapp.com",
    projectId: "skylinestudentsapp",
    storageBucket: "skylinestudentsapp.firebasestorage.app",
    messagingSenderId: "258453681321",
    appId: "1:258453681321:web:3ad14a13e7d4b823cd25b8",
    measurementId: "G-915N5TGMHK"
  };

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
