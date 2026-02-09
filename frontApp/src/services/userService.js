import { db } from "@/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export async function createUserProfile(uid, userData) {
  return await setDoc(
    doc(db, "users", uid),
    {
      ...userData,
      createdAt: new Date()
    }
  );
}
