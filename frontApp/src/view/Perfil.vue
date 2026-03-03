<template>
  <div class="perfil">

    <!-- Sidebar (desktop) -->
    <div class="perfil__sidebar">
      <AppSidebar :user="sidebarUser" @logout="handleLogout" />
    </div>

    <main class="perfil__main">

      <!-- Header desktop -->
      <div class="perfil__header-desktop">
        <AppHeader
          :user="headerUser"
          :breadcrumb="breadcrumb"
          :has-notifications="hasNotifications"
          @open-notifications="handleOpenNotifications"
        />
      </div>

      <!-- Header mobile (fundo escuro) -->
      <div class="perfil__mobile-header">
        <div class="perfil-mobile-header">
          <button class="perfil-mobile-header__back" @click="$router.back()">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <button class="perfil-mobile-header__edit" @click="handleEdit">
            <span class="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>

      <!-- Hero mobile -->
      <div class="perfil__mobile-hero">
        <div class="perfil-hero__avatar-wrap">
          <div class="perfil-hero__avatar">
            <img v-if="user.avatar" :src="user.avatar" :alt="user.name" />
            <span v-else>{{ initials }}</span>
          </div>
          <span class="perfil-hero__online"></span>
        </div>
        <p class="perfil-hero__name">{{ user.name }}</p>
        <p class="perfil-hero__role">{{ user.role }} • {{ user.period }}</p>
      </div>

      <!-- Card mobile (sobreposto ao hero) -->
      <div class="perfil__mobile-card">

        <!-- Informações pessoais -->
        <ProfileInfo :user="user" :editing="editing" @edit="handleEdit" />

        <!-- Notificações -->
        <div class="perfil__menu-item" @click="handleNotifications">
          <span class="material-symbols-outlined perfil__menu-icon">notifications</span>
          <span class="perfil__menu-label">Notificações</span>
          <span class="material-symbols-outlined perfil__menu-arrow">chevron_right</span>
        </div>

        <!-- Sair da conta -->
        <button class="perfil__logout" @click="handleLogout">
          <span class="material-symbols-outlined perfil__logout-icon">logout</span>
          <span class="perfil__logout-label">Sair da Conta</span>
        </button>

      </div>

      <!-- Conteúdo desktop -->
      <div class="perfil__content">
        <div class="perfil__heading">
          <h1 class="perfil__title">Meu Perfil</h1>
          <p class="perfil__subtitle">Gerencie suas informações pessoais e mantenha seus dados atualizados.</p>
        </div>

        <div class="perfil__grid">
          <!-- Card lateral esquerdo -->
          <ProfileCard
            :user="sidebarUser"
            :stats="stats"
            @change-photo="handleChangePhoto"
          />

          <!-- Informações -->
          <ProfileInfo :user="user" :editing="editing" @edit="handleEdit" />
        </div>
      </div>

    </main>

    <!-- Nav inferior mobile -->
    <div class="perfil__bottom-nav">
      <nav class="bottom-nav">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="bottom-nav__item"
          :class="{ active: $route.path === item.to }"
        >
          <span class="material-symbols-outlined">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </router-link>
      </nav>
    </div>

  </div>
</template>

<script>
import AppSidebar   from '@/components/AppSidebar.vue'
import AppHeader    from '@/components/AppHeader.vue'

import ProfileCard  from '@/components/perfilComponents/ProfileCard.vue'
import ProfileInfo  from '@/components/perfilComponents/ProfileInfo.vue'

export default {
  name: 'AlunosPerfil',

  components: {
    AppSidebar,
    AppHeader,
    ProfileCard,
    ProfileInfo,
  },

  data() {
    return {
      editing: false,

      sidebarUser: {
        name: 'Ricardo Silva',
        role: 'Pai do Aluno',
        avatar: '',
      },

      headerUser: {
        name: 'Ricardo Silva',
        role: 'Pai do Aluno',
        avatar: '',
      },

      breadcrumb: {
        parent: 'Sistema',
        current: 'Meu Perfil',
      },

      hasNotifications: true,

      navItems: [
        { to: '/dashAlunos',    icon: 'dashboard',      label: 'Início'       },
        { to: '/AlunosViagens', icon: 'directions_bus', label: 'Viagens'      },
        { to: '/estatisticas',  icon: 'bar_chart',      label: 'Estatísticas' },
        { to: '/AlunosPerfil',  icon: 'person',         label: 'Perfil'       },
        { to: '/Configuracoes', icon: 'settings',       label: 'Config'       },
      ],

      user: {
        name: 'Maria Silva Santos',
        role: 'Estudante',
        period: 'Período Matutino',
        email: 'maria.silva@email.com',
        phone: '(11) 98765-4321',
        cpf: '123.456.789-00',
        address: 'Rua das Flores, 123 - São Paulo, SP',
        memberSince: '14 de janeiro de 2025',
        avatar: '',
      },

      stats: {
        tripsThisMonth: 24,
      },
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

  methods: {
    handleLogout() {
      this.$router.push('/login')
    },

    handleOpenNotifications() {
      console.log('Abrir notificações')
    },

    handleEdit() {
      this.editing = !this.editing
    },

    handleChangePhoto() {
      console.log('Alterar foto')
    },

    handleNotifications() {
      console.log('Abrir configurações de notificações')
    },
  },
}
</script>

<style scoped>
@import '@/assets/styles/Perfil.css';
</style>