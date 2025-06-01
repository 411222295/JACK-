import { db } from './firebaseConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

export const uploadJobToFirebase = async (jobData: any) => {
  const docRef = await addDoc(collection(db, 'jobs'), {
    ...jobData,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};
