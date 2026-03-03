<template>
  <div class="history">

    <!-- Cabeçalho -->
    <div class="history__header">
      <h3 class="history__title">Histórico Recente</h3>
      <button class="history__view-all" @click="$emit('view-all')">
        Ver todos
      </button>
    </div>

    <!-- Tabela (desktop) -->
    <div class="history__table-wrap">
      <table class="history__table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Rota</th>
            <th class="text-center">Tipo</th>
            <th class="text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in history" :key="index">
            <td class="history__date">{{ entry.date }}</td>
            <td class="history__route">{{ entry.route }}</td>
            <td class="history__type-cell">
              <span class="history__type-badge">{{ entry.type }}</span>
            </td>
            <td class="history__status-cell">
              <span
                class="history__status-badge"
                :class="entry.attended ? 'history__status-badge--attended' : 'history__status-badge--absent'"
              >
                <span
                  class="history__status-dot"
                  :class="entry.attended ? 'history__status-dot--attended' : 'history__status-dot--absent'"
                ></span>
                {{ entry.attended ? 'Foi' : 'Não foi' }}
              </span>
            </td>
          </tr>
          <tr v-if="history.length === 0">
            <td colspan="4" class="history__empty">Nenhuma viagem encontrada.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Cards (mobile) -->
    <div class="history__cards">
      <div
        v-for="(entry, index) in history"
        :key="index"
        class="history__card"
        @click="$emit('view-entry', entry)"
      >
        <!-- Data -->
        <div class="history__card-date">
          <span class="history__card-month">{{ formatMonth(entry.date) }}</span>
          <span class="history__card-day">{{ formatDay(entry.date) }}</span>
        </div>

        <!-- Info -->
        <div class="history__card-info">
          <div class="history__card-top">
            <span class="history__card-type">{{ entry.type }}</span>
            <span
              class="history__card-badge"
              :class="entry.attended ? 'history__card-badge--attended' : 'history__card-badge--absent'"
            >
              {{ entry.attended ? 'Foi' : 'Não foi' }}
            </span>
          </div>
          <p class="history__card-route">{{ entry.route }}</p>
        </div>

        <!-- Seta -->
        <span class="material-symbols-outlined history__card-arrow">chevron_right</span>
      </div>

      <div v-if="history.length === 0" class="history__cards-empty">
        Nenhuma viagem encontrada.
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HistoryTable',

  props: {
    history: {
      type: Array,
      required: true,
      // [{ date, route, type, attended }]
    },
  },

  emits: ['view-all', 'view-entry'],

  methods: {
    formatMonth(date) {
      // date formato: DD/MM/YYYY
      const months = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ']
      const parts = date.split('/')
      const monthIndex = parseInt(parts[1]) - 1
      return months[monthIndex]
    },

    formatDay(date) {
      return date.split('/')[0]
    },
  },
}
</script>

<style scoped>
@import '@/assets/styles/HistoryTable.css';
</style>