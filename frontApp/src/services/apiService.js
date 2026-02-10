import { auth } from "@/firebase/firebaseConfig";

const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

const getAuthToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  throw new Error("Usuário não autenticado");
};

const apiRequest = async (endpoint, options = {}) => {
  try {
    const token = await getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro na requisição');
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro em ${endpoint}:`, error);
    throw error;
  }
};

// Buscar usuário
export const getUserProfile = async (uid) => {
  return apiRequest(`/users/${uid}`, {
    method: 'GET'
  });
};

// Buscar usuário por email
export const getUserByEmail = async (email) => {
  return apiRequest(`/users/email/${encodeURIComponent(email)}`, {
    method: 'GET'
  });
};

// Listar todos os usuários
export const getAllUsers = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return apiRequest(`/users${queryParams ? '?' + queryParams : ''}`, {
    method: 'GET'
  });
};

// Buscar usuários por role
export const getUsersByRole = async (role) => {
  return apiRequest(`/users/role/${role}`, {
    method: 'GET'
  });
};

// Buscar usuários ativos/inativos
export const getUsersByStatus = async (isActive) => {
  return apiRequest(`/users/status/${isActive}`, {
    method: 'GET'
  });
};

// Deletar usuário (apenas admin)
export const deleteUser = async (uid) => {
  return apiRequest('/admin/users/delete', {
    method: 'DELETE',
    body: JSON.stringify({ uid })
  });
};

// Atualizar apenas admin
export const updateUserRole = async (uid, role) => {
  return apiRequest('/admin/users/role', {
    method: 'PUT',
    body: JSON.stringify({ uid, role })
  });
};

// Definir usuário como admin (apenas super admin)
export const setUserAdmin = async (uid, isAdmin) => {
  return apiRequest('/admin/users/set-admin', {
    method: 'PUT',
    body: JSON.stringify({ uid, isAdmin })
  });
};

// Ativar/Desativar usuário (apenas admin)
export const toggleUserStatus = async (uid, isActive) => {
  return apiRequest('/admin/users/status', {
    method: 'PUT',
    body: JSON.stringify({ uid, isActive })
  });
};

// Revogar tokens de refresh do usuário (apenas admin)
export const revokeUserTokens = async (uid) => {
  return apiRequest('/admin/users/revoke-tokens', {
    method: 'POST',
    body: JSON.stringify({ uid })
  });
};

// Redefinir senha do usuário (apenas admin)
export const resetUserPassword = async (uid) => {
  return apiRequest('/admin/users/reset-password', {
    method: 'POST',
    body: JSON.stringify({ uid })
  });
};

// Desabilitar usuário completamente (apenas admin)
export const disableUser = async (uid) => {
  return apiRequest('/admin/users/disable', {
    method: 'PUT',
    body: JSON.stringify({ uid })
  });
};

// Habilitar usuário (apenas admin)
export const enableUser = async (uid) => {
  return apiRequest('/admin/users/enable', {
    method: 'PUT',
    body: JSON.stringify({ uid })
  });
};

// Listar custom claims de um usuário (apenas admin)
export const getUserClaims = async (uid) => {
  return apiRequest(`/admin/users/${uid}/claims`, {
    method: 'GET'
  });
};

// Definir custom claims (apenas admin)
export const setUserClaims = async (uid, claims) => {
  return apiRequest('/admin/users/set-claims', {
    method: 'PUT',
    body: JSON.stringify({ uid, claims })
  });
};

// Atualizar dados de usuário (apenas admin)
export const updateUserData = async (uid, userData) => {
  return apiRequest('/admin/users/update', {
    method: 'PUT',
    body: JSON.stringify({ uid, ...userData })
  });
};

// Criar usuário (apenas admin)
export const createUser = async (userData) => {
  return apiRequest('/admin/users/create', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
};

// ========== ESTATÍSTICAS (via API) ==========

// Obter estatísticas de usuários
export const getUserStats = async () => {
  return apiRequest('/admin/users/stats', {
    method: 'GET'
  });
};

// Obter contagem de usuários por role
export const getUserCountByRole = async () => {
  return apiRequest('/admin/users/count-by-role', {
    method: 'GET'
  });
};