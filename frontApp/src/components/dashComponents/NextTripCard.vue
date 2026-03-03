<template>
  <div class="next-trip">

    <div class="next-trip__icon">
      <span class="material-symbols-outlined">event</span>
    </div>

    <div class="next-trip__info">
      <p class="next-trip__label">Próxima Viagem</p>
      <h3 class="next-trip__title">{{ trip.date }} - {{ trip.origin }} → {{ trip.destination }}</h3>
      <p class="next-trip__subtitle">Saída: {{ trip.departure }} • Retorno: {{ trip.return }}</p>
    </div>

    <button class="next-trip__btn" @click="$emit('view-details', trip)">
      Ver Detalhes
    </button>

  </div>
</template>

<script>
export default {
  name: 'NextTripCard',

  props: {
    trip: {
      type: Object,
      required: true,
    },
  },

  emits: ['view-details'],
}
</script>

<style scoped>
@import '@/assets/styles/NextTripCard.css';
</style>