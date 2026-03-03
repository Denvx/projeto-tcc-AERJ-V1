<template>
  <div
    class="trip-item"
    :class="{ 'trip-item--past': trip.status === 'concluded' }"
    @click="$emit('click', trip)"
  >

    <!-- Data -->
    <div class="trip-item__date">
      <span class="trip-item__day">{{ formatDay(trip.date) }}</span>
      <span class="trip-item__month">{{ formatMonth(trip.date) }}</span>
    </div>

    <!-- Info -->
    <div class="trip-item__info">
      <p class="trip-item__route">{{ trip.origin }} → {{ trip.destination }}</p>
      <div class="trip-item__type">
        <span class="material-symbols-outlined">{{ typeIcon }}</span>
        <span>{{ trip.type }}</span>
      </div>
    </div>

    <!-- Horários (desktop) -->
    <div class="trip-item__times">
      <div class="trip-item__time">
        <span class="trip-item__time-label">Saída</span>
        <span class="trip-item__time-value">{{ trip.departure }}</span>
      </div>
      <div class="trip-item__time">
        <span class="trip-item__time-label">Retorno</span>
        <span class="trip-item__time-value">{{ trip.return }}</span>
      </div>
    </div>

    <!-- Status -->
    <span class="trip-item__status" :class="statusClass">
      {{ statusLabel }}
    </span>

  </div>
</template>

<script>
export default {
  name: 'TripListItem',

  props: {
    trip: {
      type: Object,
      required: true,
      // { date, origin, destination, type, departure, return, status }
      // status: 'confirmed' | 'absent' | 'concluded' | 'pending'
    },
  },

  emits: ['click'],

  computed: {
    typeIcon() {
      if (this.trip.type === 'Ida e Volta') return 'sync_alt'
      if (this.trip.type === 'Somente Ida') return 'arrow_forward'
      return 'arrow_back'
    },

    statusClass() {
      const map = {
        confirmed: 'trip-item__status--confirmed',
        absent:    'trip-item__status--absent',
        concluded: 'trip-item__status--concluded',
        pending:   'trip-item__status--pending',
      }
      return map[this.trip.status] || ''
    },

    statusLabel() {
      const map = {
        confirmed: 'Confirmado',
        absent:    'Ausente',
        concluded: 'Concluída',
        pending:   'Pendente',
      }
      return map[this.trip.status] || ''
    },
  },

  methods: {
    formatDay(date) {
      return date.split('/')[0]
    },

    formatMonth(date) {
      const months = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ']
      const parts = date.split('/')
      return months[parseInt(parts[1]) - 1]
    },
  },
}
</script>

<style scoped>
@import '@/assets/styles/TripListItem.css';
</style>