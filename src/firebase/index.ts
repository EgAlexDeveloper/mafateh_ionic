import { FirebaseOptions, initializeApp } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyCSNhWNfWq3xN7VisGdKLeCSsLKxN1GkYs",
    authDomain: "mafateh-mobile.firebaseapp.com",
    databaseURL: "https://mafateh-mobile-default-rtdb.firebaseio.com",
    projectId: "mafateh-mobile",
    storageBucket: "mafateh-mobile.appspot.com",
    messagingSenderId: "882862106105",
    appId: "1:882862106105:web:839bdfc171527038504928",
    measurementId: "G-J6MRF6BD35"
};

const FirebaseApp = initializeApp(firebaseConfig);
export default FirebaseApp;