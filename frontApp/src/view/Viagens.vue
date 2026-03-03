<template>
  <div class="viagens">

    <!-- Sidebar (desktop) -->
    <div class="viagens__sidebar">
      <AppSidebar :user="sidebarUser" @logout="handleLogout" />
    </div>

    <main class="viagens__main">

      <!-- Header desktop -->
      <div class="viagens__header-desktop">
        <AppHeader
          :user="headerUser"
          :breadcrumb="breadcrumb"
          :has-notifications="hasNotifications"
          @open-notifications="handleOpenNotifications"
        />
      </div>

      <!-- Header mobile -->
      <div class="viagens__mobile-header">
        <div class="viagens-mobile-header">
          <div class="viagens-mobile-header__left">
            <button class="viagens-mobile-header__back" @click="$router.back()">
              <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <span class="viagens-mobile-header__title">Minhas Viagens</span>
          </div>
          <div class="viagens-mobile-header__avatar">
            <img v-if="headerUser.avatar" :src="headerUser.avatar" :alt="headerUser.name" />
            <span v-else>{{ initials }}</span>
          </div>
        </div>
      </div>

      <!-- Conteúdo -->
      <div class="viagens__content">

        <!-- Título (desktop) -->
        <div class="viagens__heading">
          <h1 class="viagens__title">Minhas Viagens</h1>
          <p class="viagens__subtitle">Gerencie e acompanhe todas as suas viagens universitárias</p>
        </div>

        <!-- Cards de estatísticas -->
        <div class="viagens__stats">
          <TripStatsCard
            label="Próximas Viagens"
            :value="stats.upcoming"
            icon="directions_bus"
            variant="dark"
          />
          <TripStatsCard
            label="Ausências"
            :value="stats.absences"
            icon="event_busy"
            icon-color="red"
          />
          <TripStatsCard
            label="Confirmadas"
            :value="stats.confirmed"
            icon="check_circle"
            icon-color="green"
            :hide-mobile="true"
          />
        </div>

        <!-- Lista de viagens -->
        <div class="viagens__list-section">

          <!-- Cabeçalho desktop -->
          <div class="viagens__list-header">
            <div class="viagens__list-heading">
              <h2 class="viagens__list-title">Histórico de Viagens</h2>
              <p class="viagens__list-subtitle">Visualize todas as suas viagens passadas e futuras</p>
            </div>
            <TripFilterTabs v-model="activeFilter" />
          </div>

          <!-- Filtro mobile -->
          <TripFilterTabs v-model="activeFilter" class="viagens__filter-mobile" />

          <!-- Seção: Agendadas (mobile) -->
          <template v-if="upcomingTrips.length > 0">
            <p class="viagens__section-label">Agendadas para esta semana</p>
            <div class="viagens__list">
              <TripListItem
                v-for="(trip, i) in upcomingTrips"
                :key="'upcoming-' + i"
                :trip="trip"
                @click="handleTripClick"
              />
            </div>
          </template>

          <!-- Seção: Histórico (mobile) / Todas (desktop) -->
          <template v-if="pastTrips.length > 0">
            <p class="viagens__section-label">Histórico Recente</p>
            <div class="viagens__list">
              <TripListItem
                v-for="(trip, i) in pastTrips"
                :key="'past-' + i"
                :trip="trip"
                @click="handleTripClick"
              />
            </div>
          </template>

        </div>

        <!-- Carregar mais -->
        <div class="viagens__load-more">
          <button class="viagens__load-more-btn" @click="loadMore">
            Carregar mais viagens
            <span class="material-symbols-outlined">expand_more</span>
          </button>
        </div>

      </div>
    </main>

    <!-- Nav inferior mobile -->
    <div class="viagens__bottom-nav">
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

import TripStatsCard   from '@/components/viagenComponents/TripStatsCard.vue'
import TripFilterTabs  from '@/components/viagenComponents/TripFilterTabs.vue'
import TripListItem    from '@/components/viagenComponents/TripListItem.vue'

export default {
  name: 'AlunosViagens',

  components: {
    AppSidebar,
    AppHeader,
    TripStatsCard,
    TripFilterTabs,
    TripListItem,
  },

  data() {
    return {
      activeFilter: 'todas',

      sidebarUser: {
        name: 'Ricardo Silva',
        role: 'Pai do Aluno',
        avatar: '',
      },

      headerUser: {
        name: 'Maria Silva Santos',
        role: 'Matrícula: 2024.1.0023',
        avatar: '',
      },

      breadcrumb: {
        parent: 'Dashboard',
        current: 'Viagens',
      },

      hasNotifications: true,

      navItems: [
        { to: '/dashAlunos',    icon: 'dashboard',      label: 'Início'       },
        { to: '/AlunosViagens', icon: 'directions_bus', label: 'Viagens'      },
        { to: '/estatisticas',  icon: 'bar_chart',      label: 'Estatísticas' },
        { to: '/AlunosPerfil',  icon: 'person',         label: 'Perfil'       },
        { to: '/Configuracoes', icon: 'settings',       label: 'Config'       },
      ],

      stats: {
        upcoming:  12,
        absences:  2,
        confirmed: 6,
      },

      trips: [
        { date: '16/02/2024', origin: 'Centro', destination: 'Barra da Tijuca', type: 'Ida e Volta',  departure: '07:00', return: '18:00', status: 'confirmed' },
        { date: '17/02/2024', origin: 'Centro', destination: 'Barra da Tijuca', type: 'Somente Ida',  departure: '07:00', return: '18:00', status: 'absent'    },
        { date: '15/02/2024', origin: 'Centro', destination: 'Barra da Tijuca', type: 'Ida e Volta',  departure: '07:00', return: '18:00', status: 'concluded' },
        { date: '20/02/2024', origin: 'Barra',  destination: 'Recreio',         type: 'Ida e Volta',  departure: '07:00', return: '18:00', status: 'confirmed' },
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

    upcomingTrips() {
      if (this.activeFilter === 'passadas') return []
      return this.trips.filter(t => t.status === 'confirmed' || t.status === 'pending')
    },

    pastTrips() {
      if (this.activeFilter === 'proximas') return []
      return this.trips.filter(t => t.status === 'concluded' || t.status === 'absent')
    },
  },

  methods: {
    handleLogout() {
      this.$router.push('/login')
    },

    handleOpenNotifications() {
      console.log('Abrir notificações')
    },

    handleTripClick(trip) {
      console.log('Ver detalhes da viagem:', trip)
    },

    loadMore() {
      console.log('Carregar mais viagens')
    },
  },
}
</script>
<style scoped>
@import '@/assets/styles/AlunosViagens.css';
</style>    