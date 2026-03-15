// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD-uZBuZU56BcD2_JRF9ie1VCrUGDcZ8Oo",
//   authDomain: "library-87019.firebaseapp.com",
//   projectId: "library-87019",
//   storageBucket: "library-87019.firebasestorage.app",
//   messagingSenderId: "1060553416766",
//   appId: "1:1060553416766:web:773302c9614de9b243716f"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-uZBuZU56BcD2_JRF9ie1VCrUGDcZ8Oo",
  authDomain: "library-87019.firebaseapp.com",
  projectId: "library-87019",
  storageBucket: "library-87019.appspot.com", // 🔴 FIXED
  messagingSenderId: "1060553416766",
  appId: "1:1060553416766:web:773302c9614de9b243716f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ EXPORT THESE (VERY IMPORTANT)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
