import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export const createUserProfile = async (uid, userData) => {
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error("Erro ao criar perfil:", error);
    throw error;
  }
};

// Buscar perfil do usuário 
export const getMyProfile = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      throw new Error("Perfil não encontrado");
    }
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    throw error;
  }
};

// Atualizar dados básicos 
export const updateMyProfile = async (uid, userData) => {
  try {
    const userRef = doc(db, "users", uid);
    const { role, isActive, email, createdAt, ...allowedData } = userData;
    
    await updateDoc(userRef, {
      ...allowedData,
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    throw error;
  }
};


/*
 como usar no componente:
<script>
// Para operações do próprio usuário
import { getMyProfile, updateMyProfile } from '@/services/userService';

// Para operações administrativas
import { 
  getAllUsers, 
  getUserProfile, 
  deleteUser, 
  setUserAdmin, 
  toggleUserStatus,
  getUsersByRole
} from '@/services/apiService';

export default {
  data() {
    return {
      myProfile: null,
      users: []
    };
  },

  async mounted() {
    await this.loadMyProfile();
  },

  methods: {
    // Carregar perfil do usuário logado
    async loadMyProfile() {
      try {
        const uid = this.$store.state.user.uid; // ou de onde você pega o UID
        this.myProfile = await getMyProfile(uid);
      } catch (error) {
        this.showAlert('Erro ao carregar perfil', 'error');
      }
    },

    // Atualizar meu próprio perfil
    async updateProfile(data) {
      try {
        const uid = this.$store.state.user.uid;
        await updateMyProfile(uid, data);
        this.showAlert('Perfil atualizado!', 'success');
      } catch (error) {
        this.showAlert('Erro ao atualizar perfil', 'error');
      }
    },

    // ===== OPERAÇÕES ADMIN (via API) =====

    // Listar todos os usuários
    async loadAllUsers() {
      try {
        const response = await getAllUsers();
        this.users = response.users;
      } catch (error) {
        this.showAlert('Erro ao carregar usuários', 'error');
      }
    },

    // Buscar usuário específico
    async loadUser(uid) {
      try {
        const user = await getUserProfile(uid);
        console.log('Usuário:', user);
      } catch (error) {
        this.showAlert('Erro ao carregar usuário', 'error');
      }
    },

    // Tornar admin
    async makeAdmin(uid) {
      try {
        await setUserAdmin(uid, true);
        this.showAlert('Usuário agora é admin!', 'success');
        await this.loadAllUsers(); // Recarregar lista
      } catch (error) {
        this.showAlert('Erro: ' + error.message, 'error');
      }
    },

    // Deletar usuário
    async removeUser(uid) {
      if (!confirm('Tem certeza que deseja deletar este usuário?')) return;
      
      try {
        await deleteUser(uid);
        this.showAlert('Usuário deletado!', 'success');
        await this.loadAllUsers();
      } catch (error) {
        this.showAlert('Erro ao deletar: ' + error.message, 'error');
      }
    },

    // Ativar/Desativar
    async toggleStatus(uid, currentStatus) {
      try {
        await toggleUserStatus(uid, !currentStatus);
        this.showAlert('Status atualizado!', 'success');
        await this.loadAllUsers();
      } catch (error) {
        this.showAlert('Erro: ' + error.message, 'error');
      }
    },

    // Buscar motoristas
    async loadDrivers() {
      try {
        const response = await getUsersByRole('driver');
        console.log('Motoristas:', response.users);
      } catch (error) {
        this.showAlert('Erro ao buscar motoristas', 'error');
      }
    }
  }
};
</script>
*/