<template>
  <main class="min-h-screen bg-slate-50 p-6 md:p-10 relative">
    <!-- Botão de Logout fixo no canto superior direito -->
    <div class="fixed top-6 right-6 z-50">
      <button
        @click="handleLogout"
        :disabled="isLoading"
        class="flex items-center gap-2 px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <span v-if="isLoading" class="spinner"></span>
        <svg 
          v-else
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        <span class="font-medium">{{ isLoading ? 'Saindo...' : 'Sair' }}</span>
      </button>
    </div>

    <header class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800 tracking-tight">
        Fala, <span class="text-indigo-600">{{ studentName }}</span>! 👋
      </h1>
      <p class="text-slate-500 mt-2">Pronto para continuar seus estudos na AERJ, Sr. Admin?</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <section class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <h3 class="font-semibold text-slate-700 mb-4">Seu Progresso Total</h3>
        <div class="w-full bg-slate-100 rounded-full h-4 mb-2">
          <div 
            class="bg-indigo-500 h-4 rounded-full transition-all duration-500" 
            :style="{ width: progress + '%' }"
          ></div>
        </div>
        <p class="text-sm text-slate-500 text-right">{{ progress }}% concluído</p>
      </section>

      <section class="md:col-span-2 bg-indigo-600 p-6 rounded-2xl text-white flex justify-between items-center overflow-hidden relative">
        <div class="z-10">
          <h3 class="text-xl font-bold mb-2">Novos materiais disponíveis</h3>
          <p class="text-indigo-100 mb-4">Confira as atualizações na sua trilha.</p>
          <button class="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold hover:bg-indigo-50 transition-colors">
            Acessar trilha
          </button>
        </div>
        <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500 rounded-full opacity-50"></div>
      </section>

    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { logoutAuth } from '@/services/authService'
import { clearUserCache } from '@/services/userService'

const router = useRouter()

// Dados do componente
const studentName = ref('Dev Denver')
const progress = ref(5)
const isLoading = ref(false)

// Função de logout
const handleLogout = async () => {
  const confirmed = window.confirm('Tem certeza que deseja sair?')
  if (!confirmed) return

  isLoading.value = true

  try {
    await logoutAuth()
    clearUserCache()
    await router.push({ name: 'login' })
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
    alert('Erro ao sair. Tente novamente.')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { 
    transform: rotate(360deg); 
  }
}
</style>