import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const FirebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyCSNhWNfWq3xN7VisGdKLeCSsLKxN1GkYs",
    authDomain: "mafateh-mobile.firebaseapp.com",
    databaseURL: "https://mafateh-mobile-default-rtdb.firebaseio.com",
    projectId: "mafateh-mobile",
    storageBucket: "mafateh-mobile.appspot.com",
    messagingSenderId: "882862106105",
    appId: "1:882862106105:web:839bdfc171527038504928",
    measurementId: "G-J6MRF6BD35"
};

const FirebaseApp = initializeApp(FirebaseConfig);
const messaging = getMessaging(FirebaseApp);

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission()
        .then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                getToken(messaging, { vapidKey: 'BCbRQ8tU0RJPiz7sOJN8g1r4dtBPjt9V7DVAddwPQpoGSYkTPP1g0ra_ZQxy2U2EZvdbPLDw-XsCx4FJFLDwzM4' })
                    .then(res => console.log(res));
            }
        });
}

requestPermission();



// onMessage(messaging, (res) => {
//     alert()
//     console.log(res)
// })
export { FirebaseApp, FirebaseConfig };