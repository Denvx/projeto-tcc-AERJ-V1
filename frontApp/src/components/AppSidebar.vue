<template>
  <aside class="sidebar">

    <!-- Logo -->
    <div class="sidebar__logo">
      <div class="sidebar__logo-icon">
        <span class="material-symbols-outlined">directions_bus</span>
      </div>
      <div>
        <h1 class="sidebar__logo-title">TransPorte</h1>
        <p class="sidebar__logo-subtitle">Gestão de Viagens</p>
      </div>
    </div>

    <!-- Nav -->
    <nav class="sidebar__nav">
      <router-link v-for="item in navItems" :key="item.to" :to="item.to" class="sidebar__nav-item"
        active-class="active">
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Usuário -->
    <div class="sidebar__footer">
      <div class="sidebar__user">
        <div class="sidebar__user-info">
          <div class="sidebar__avatar">
            <img v-if="user.avatar" :src="user.avatar" :alt="user.name" />
            <span v-else>{{ initials }}</span>
          </div>
          <div>
            <p class="sidebar__user-name">{{ user.name }}</p>
            <p class="sidebar__user-role">{{ user.role }}</p>
          </div>
        </div>
        <LogoutButton class="sidebar__logout" variant="icon" :text="''" :show-icon="true" confirm-before-logout
          @logout-success="$emit('logout')">
          <template #icon>
            <span class="material-symbols-outlined">logout</span>
          </template>
        </LogoutButton>
      </div>
    </div>

  </aside>
</template>

<script>
import LogoutButton from '@/components/LogoutButton.vue'
export default {
  name: 'AppSidebar',

  props: {
    user: {
      type: Object,
      required: true,
      // { name: String, role: String, avatar: String }
    },
  },
  components: {
  LogoutButton,
},

  emits: ['logout'],

  data() {
    return {
      navItems: [
        { to: '/dashAlunos', icon: 'dashboard', label: 'Dashboard' },
        { to: '/viagens', icon: 'directions_bus', label: 'Viagens' },
        { to: '/estatisticas', icon: 'bar_chart', label: 'Estatísticas' },
        { to: '/perfil', icon: 'person', label: 'Perfil' },
        { to: '/configuracoes', icon: 'settings', label: 'Configurações' },
      ],
    }
  },

  computed: {
    initials() {
      return this.user.name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    },
  },
}
</script>

<style scoped>
@import '@/assets/styles/AppSidebar.css';
</style>