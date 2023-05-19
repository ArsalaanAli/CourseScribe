// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID,
  databaseURL: "https://coursescribe-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);

export function DatabaseInit() {
  get(ref(database)).then((snapshot) => {
    console.log(snapshot.val());
  });
}

export async function UserExists(username: string | null | undefined) {
  const userRef = child(dbRef, `/users/${username}`);
  const user = await get(userRef);
  if (!user.exists()) {
    console.log("adding");
    set(child(dbRef, `/users/${username}`), true);
  } else {
    console.log("exists");
  }
}
