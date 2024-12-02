// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjMNdrhAfrDREpsBtsGcOvvc--vcQmuJw",
  authDomain: "minafin-2eb16.firebaseapp.com",
  projectId: "minafin-2eb16",
  storageBucket: "minafin-2eb16.appspot.com",
  messagingSenderId: "924494828241",
  appId: "1:924494828241:web:ed055034773ff2598a2bf0",
  measurementId: "G-PH6JQ59TJH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
