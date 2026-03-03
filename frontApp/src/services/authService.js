import { auth } from "@/firebase/firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

export async function registerAuth(email, password) {
  try {
    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios");
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw error;
  }
}

export async function loginAuth(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
}

export async function logoutAuth() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error;
  }
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        resolve(user);
      },
      (error) => {
        removeListener();
        reject(error);
      }
    );
  });
};