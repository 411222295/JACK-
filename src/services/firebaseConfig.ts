// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyByk_WD0-njdbPMnHQfhzCsTQGrTuTimYE",
  authDomain: "talentagdata.firebaseapp.com",
  projectId: "talentagdata",
  storageBucket: "talentagdata.appspot.com", // ⚠️ 修正成 .appspot.com
  messagingSenderId: "726309884439",
  appId: "1:726309884439:web:e8c8057d12f89c17680252",
  measurementId: "G-NLJQ055JC2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // 加入 Firestore 實例

export { db };
