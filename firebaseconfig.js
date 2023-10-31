import { initializeApp } from 'firebase/app';
import {getStorage} from 'firebase/storage'
const firebaseConfig = {

  apiKey: "AIzaSyBad8rDXBnJ_eZZRFIgBYH-nBKW7h8txS0",

  authDomain: "recordproject-51e0e.firebaseapp.com",

  projectId: "recordproject-51e0e",

  storageBucket: "recordproject-51e0e.appspot.com",

  messagingSenderId: "278947465477",

  appId: "1:278947465477:web:61ce603c3fdaeec1900f6c"

};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

