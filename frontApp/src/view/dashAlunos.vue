<template>
  <div class="dashboard">

    <!-- Sidebar (desktop) -->
    <div class="dashboard__sidebar">
      <AppSidebar
        :user="sidebarUser"
        @logout="handleLogout"
      />
    </div>

    <!-- Main -->
    <main class="dashboard__main">

      <!-- Header desktop -->
      <div class="dashboard__header-desktop">
        <AppHeader
          :user="headerUser"
          :breadcrumb="breadcrumb"
          :has-notifications="hasNotifications"
          @open-notifications="handleOpenNotifications"
        />
      </div>

      <!-- Header mobile -->
      <div class="dashboard__mobile-header">
        <div class="mobile-header">
          <div class="mobile-header__top">
            <div class="mobile-header__user">
              <div class="mobile-header__avatar">
                <img v-if="headerUser.avatar" :src="headerUser.avatar" :alt="headerUser.name" />
                <span v-else>{{ initials }}</span>
              </div>
              <div>
                <p class="mobile-header__greeting">Bem-vinda,</p>
                <p class="mobile-header__name">{{ headerUser.name }}</p>
              </div>
            </div>
            <button class="mobile-header__bell" @click="handleOpenNotifications">
              <span class="material-symbols-outlined">notifications</span>
              <span v-if="hasNotifications" class="mobile-header__bell-dot"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Conteúdo -->
      <div class="dashboard__content">

        <!-- Cards do topo -->
        <div class="dashboard__cards">
          <NextTripCard
            :trip="nextTrip"
            @view-details="handleViewDetails"
          />
          <PresenceRateCard
            :rate="presenceRate"
            :goal="presenceGoal"
          />
        </div>

        <!-- Confirmar presença -->
        <ConfirmPresence
          :trip="nextTrip"
          @confirm="handleConfirm"
          @decline="handleDecline"
        />

        <!-- Histórico -->
        <HistoryTable
          :history="tripHistory"
          @view-all="handleViewAll"
        />

      </div>
    </main>

    <!-- Nav inferior mobile -->
    <div class="dashboard__bottom-nav">
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
import AppSidebar       from '@/components/AppSidebar.vue'
import AppHeader        from '@/components/AppHeader.vue'
import NextTripCard     from '@/components/NextTripCard.vue'
import PresenceRateCard from '@/components/PresenceRateCard.vue'
import ConfirmPresence  from '@/components/ConfirmPresence.vue'
import HistoryTable     from '@/components/HistoryTable.vue'

export default {
  name: 'DashAlunos',

  components: {
    AppSidebar,
    AppHeader,
    NextTripCard,
    PresenceRateCard,
    ConfirmPresence,
    HistoryTable,
  },

  data() {
    return {
      sidebarUser: {
        name: 'Ricardo Silva',
        role: 'Pai do Aluno',
        avatar: '',
      },

      headerUser: {
        name: 'Maria Silva Santos',
        role: 'Passageiro',
        avatar: '',
      },

      breadcrumb: {
        parent: 'Dashboard',
        current: 'Visão Geral',
      },

      hasNotifications: true,

      navItems: [
        { to: '/dashAlunos',    icon: 'dashboard',      label: 'Início'       },
        { to: '/AlunosViagens', icon: 'directions_bus', label: 'Viagens'      },
        { to: '/estatisticas',  icon: 'bar_chart',      label: 'Estatísticas' },
        { to: '/AlunosPerfil',  icon: 'person',         label: 'Perfil'       },
        { to: '/Configuracoes',  icon: 'settings',       label: 'Config'       },
      ],

      nextTrip: {
        date: '16/02',
        dayLabel: 'sexta-feira',
        fullDate: '16 de Fevereiro',
        origin: 'Centro',
        destination: 'Barra',
        departure: '07:30',
        return: '18:00',
      },

      presenceRate: 80,
      presenceGoal: 90,

      tripHistory: [
        { date: '14/02/2024', route: 'Centro ↔ Barra', type: 'Ida e Volta', attended: true  },
        { date: '12/02/2024', route: 'Centro ↔ Barra', type: 'Ida e Volta', attended: true  },
        { date: '09/02/2024', route: 'Centro → Barra', type: 'Só Ida',      attended: false },
        { date: '07/02/2024', route: 'Centro ↔ Barra', type: 'Ida e Volta', attended: true  },
        { date: '05/02/2024', route: 'Centro ↔ Barra', type: 'Ida e Volta', attended: true  },
      ],
    }
  },

  computed: {
    initials() {
      return this.headerUser.name
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

    handleViewDetails(trip) {
      console.log('Ver detalhes:', trip)
    },

    handleConfirm({ trip, tripType }) {
      console.log('Presença confirmada:', { trip, tripType })
    },

    handleDecline() {
      console.log('Usuário não irá na viagem')
    },

    handleViewAll() {
      this.$router.push('/AlunosViagens')
    },
  },
}
</script>

<style scoped>
@import '@/assets/styles/dashAlunos.css';
</style>