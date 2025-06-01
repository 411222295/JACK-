import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByk_WD0-njdbPMnHQfhzCsTQGrTuTimYE",
  authDomain: "talentagdata.firebaseapp.com",
  projectId: "talentagdata",
  storageBucket: "talentagdata.appspot.com",
  messagingSenderId: "726309884439",
  appId: "1:726309884439:web:e8c8057d12f89c17680252",
  measurementId: "G-NLJQ055JC2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testWriteToFirebase() {
  try {
    const docRef = await addDoc(collection(db, "jobs"), {
      title: "測試職缺",
      createdAt: Timestamp.now()
    });
    console.log("✅ 成功寫入 Firebase:", docRef.id);
  } catch (error) {
    console.error("❌ 寫入失敗:", error);
  }
}

testWriteToFirebase();
