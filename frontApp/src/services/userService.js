import { db } from "@/firebase/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

const userDataCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

export async function createUserProfile(uid, userData) {
  try {
    if (!uid) throw new Error("UID é obrigatório");
    
    await setDoc(doc(db, "users", uid), {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    userDataCache.delete(uid);
  } catch (error) {
    console.error("Erro ao criar perfil do usuário:", error);
    throw new Error(`Falha ao criar perfil: ${error.message}`);
  }
}

export async function getUserData(uid, forceRefresh = false) {
  try {
    if (!uid) {
      console.warn("getUserData chamado sem UID");
      return null;
    }

    if (!forceRefresh && userDataCache.has(uid)) {
      const cached = userDataCache.get(uid);
      if (Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
      }
      userDataCache.delete(uid);
    }

    const userDoc = await getDoc(doc(db, "users", uid));
    const data = userDoc.exists() ? userDoc.data() : null;

    if (data) {
      userDataCache.set(uid, {
        data,
        timestamp: Date.now()
      });
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    return null;
  }
}

export async function isUserAdmin(uid) {
  try {
    const userData = await getUserData(uid);
    return Boolean(userData?.isAdmin);
  } catch (error) {
    console.error("Erro ao verificar status de admin:", error);
    return false;
  }
}

export function clearUserCache(uid = null) {
  if (uid) {
    userDataCache.delete(uid);
  } else {
    userDataCache.clear();
  }
}