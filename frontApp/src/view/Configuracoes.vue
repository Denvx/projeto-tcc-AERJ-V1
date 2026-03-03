<template>
  <div class="configuracoes">

    <!-- Sidebar (desktop) -->
    <div class="configuracoes__sidebar">
      <AppSidebar :user="sidebarUser" @logout="handleLogout" />
    </div>

    <main class="configuracoes__main">

      <!-- Header desktop -->
      <div class="configuracoes__header-desktop">
        <AppHeader
          :user="headerUser"
          :breadcrumb="breadcrumb"
          :has-notifications="hasNotifications"
          @open-notifications="handleOpenNotifications"
        />
      </div>

      <!-- Header mobile -->
      <div class="configuracoes__mobile-header">
        <div class="config-mobile-header">
          <button class="config-mobile-header__back" @click="$router.back()">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <span class="config-mobile-header__title">Configurações</span>
        </div>
      </div>

      <!-- Conteúdo -->
      <div class="configuracoes__content">

        <!-- Cabeçalho desktop -->
        <div class="configuracoes__heading">
          <div class="configuracoes__heading-text">
            <h1 class="configuracoes__title">Configurações</h1>
            <p class="configuracoes__subtitle">Gerencie suas preferências de conta, segurança e notificações.</p>
          </div>
          <button class="configuracoes__btn-save-top" @click="handleSave">
            Salvar Alterações
          </button>
        </div>

        <div class="configuracoes__sections">

          <!-- Notificações -->
          <p class="configuracoes__section-label">Notificações</p>
          <SettingsSection title="Notificações" icon="notifications">
            <SettingsToggle
              v-model="settings.emailNotifications"
              icon="mail"
              label="E-mail"
              description="Receba atualizações importantes por e-mail."
              type="toggle"
            />
            <SettingsToggle
              v-model="settings.pushNotifications"
              icon="notifications"
              label="Push Notifications"
              description="Alertas em tempo real no seu dispositivo móvel."
              type="toggle"
            />
            <SettingsToggle
              v-model="settings.tripReminders"
              icon="departure_board"
              label="Lembretes de Viagem"
              description="Avisos 15 minutos antes da chegada do transporte."
              type="toggle"
            />
          </SettingsSection>

          <!-- Segurança -->
          <p class="configuracoes__section-label">Segurança</p>
          <SettingsSection title="Segurança" icon="security">
            <SettingsToggle
              icon="lock_reset"
              label="Alterar Senha"
              description="Mantenha sua conta protegida com uma senha forte."
              type="button"
              action-label="Configurar Senha"
              mobile-value=""
              @action="handleChangePassword"
            />
            <SettingsToggle
              v-model="settings.twoFactor"
              icon="verified_user"
              label="Autenticação de dois fatores"
              description="Camada extra de segurança ao fazer login."
              type="toggle"
            />
          </SettingsSection>

          <!-- Preferências -->
          <p class="configuracoes__section-label">Preferências</p>
          <SettingsSection title="Preferências do Sistema" icon="tune">
            <SettingsToggle
              v-model="settings.darkMode"
              icon="dark_mode"
              label="Modo Escuro"
              description="Ajuste a aparência para reduzir o cansaço visual."
              type="toggle"
            />
            <SettingsToggle
              v-model="settings.language"
              icon="language"
              label="Idioma"
              description="Selecione o idioma da interface."
              type="select"
              mobile-value="Português (BR)"
              @action="handleLanguage"
            >
              <template #options>
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es">Español</option>
              </template>
            </SettingsToggle>
          </SettingsSection>

          <!-- Logout mobile -->
          <button class="configuracoes__mobile-logout" @click="handleLogout">
            <span class="material-symbols-outlined">logout</span>
            <span class="configuracoes__mobile-logout-label">Sair da Conta</span>
          </button>

        </div>

        <!-- Rodapé desktop -->
        <div class="configuracoes__footer">
          <button class="configuracoes__btn-discard" @click="handleDiscard">
            Descartar
          </button>
          <button class="configuracoes__btn-save" @click="handleSave">
            Salvar Alterações
          </button>
        </div>

      </div>
    </main>

    <!-- Nav inferior mobile -->
    <div class="configuracoes__bottom-nav">
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
import AppSidebar      from '@/components/AppSidebar.vue'
import AppHeader       from '@/components/AppHeader.vue'

import SettingsSection from '@/components/settingComponents/SettingsSection.vue'
import SettingsToggle  from '@/components/settingComponents/SettingsToggle.vue'

export default {
  name: 'AlunoConfiguracoes',

  components: {
    AppSidebar,
    AppHeader,
    SettingsSection,
    SettingsToggle,
  },

  data() {
    return {
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
        parent: 'Configurações',
        current: 'Geral',
      },

      hasNotifications: true,

      navItems: [
        { to: '/dashAlunos',    icon: 'dashboard',      label: 'Início'       },
        { to: '/AlunosViagens', icon: 'directions_bus', label: 'Viagens'      },
        { to: '/estatisticas',  icon: 'bar_chart',      label: 'Estatísticas' },
        { to: '/AlunosPerfil',  icon: 'person',         label: 'Perfil'       },
        { to: '/Configuracoes', icon: 'settings',       label: 'Config'       },
      ],

      settings: {
        emailNotifications: true,
        pushNotifications: true,
        tripReminders: false,
        twoFactor: false,
        darkMode: false,
        language: 'pt-BR',
      },

      // cópia para descartar
      originalSettings: null,
    }
  },

  created() {
    this.originalSettings = { ...this.settings }
  },

  methods: {
    handleSave() {
      this.originalSettings = { ...this.settings }
      console.log('Configurações salvas:', this.settings)
    },

    handleDiscard() {
      this.settings = { ...this.originalSettings }
    },

    handleChangePassword() {
      console.log('Abrir modal de senha')
    },

    handleLanguage() {
      console.log('Abrir seletor de idioma')
    },

    handleOpenNotifications() {
      console.log('Abrir notificações')
    },

    handleLogout() {
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
@import '@/assets/styles/Settings/Configuracoes.css';
</style>