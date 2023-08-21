import {initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
function StartFireBase(){
    const firebaseConfig = {
        apiKey: "AIzaSyCouWPecLdbpdxoCpwQjheZaVC5PCgy4U8",
        authDomain: "rudelabsatul.firebaseapp.com",
        projectId: "rudelabsatul",
        storageBucket: "rudelabsatul.appspot.com",
        messagingSenderId: "320531091679",
        appId: "1:320531091679:web:457da943f3de854d5d596a"
      };
    
    const app= initializeApp(firebaseConfig);
    
    return getFirestore(app)
}

export default StartFireBase;