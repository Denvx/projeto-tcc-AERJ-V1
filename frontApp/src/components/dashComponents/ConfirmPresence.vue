<template>
  <div class="confirm">
    <div class="confirm__inner">
      <div class="confirm__content">

        <!-- Cabeçalho -->
        <div>
          <div class="confirm__heading">
            <h2 class="confirm__title">Confirmar Presença</h2>
            <span class="confirm__today-badge">Hoje</span>
          </div>
          <p class="confirm__subtitle">
            Você possui uma viagem agendada para {{ trip.dayLabel }}, {{ trip.fullDate }}.
          </p>
        </div>

        <!-- Detalhes desktop -->
        <div class="confirm__details">
          <div>
            <p class="confirm__detail-label">Rota</p>
            <p class="confirm__detail-value">{{ trip.origin }} → {{ trip.destination }}</p>
          </div>
          <div>
            <p class="confirm__detail-label">Saída</p>
            <p class="confirm__detail-value">{{ trip.departure }}</p>
          </div>
          <div>
            <p class="confirm__detail-label">Retorno</p>
            <p class="confirm__detail-value">{{ trip.return }}</p>
          </div>
        </div>

        <!-- Rota mobile com ícone -->
        <div class="confirm__route-mobile">
          <div class="confirm__route-icon">
            <span class="material-symbols-outlined">directions_bus</span>
          </div>
          <div class="confirm__route-info">
            <p class="confirm__route-name">{{ trip.origin }} → {{ trip.destination }}</p>
            <p class="confirm__route-time">Horário: {{ trip.departure }} - {{ trip.return }}</p>
          </div>
        </div>

        <!-- Seleção de trajeto -->
        <div>
          <p class="confirm__trip-question">Qual será o seu trajeto?</p>
          <div class="confirm__options">
            <label
              v-for="option in tripOptions"
              :key="option.value"
              class="confirm__option"
            >
              <input
                type="radio"
                name="trip_type"
                :value="option.value"
                v-model="selectedTripType"
              />
              <span class="confirm__option-label">{{ option.label }}</span>
            </label>
          </div>
        </div>

        <!-- Ações -->
        <div class="confirm__actions">
          <button class="confirm__btn-confirm" @click="handleConfirm">
            <span class="material-symbols-outlined">check_circle</span>
            Confirmar Presença
          </button>
          <button class="confirm__btn-decline" @click="$emit('decline')">
            Não poderei ir hoje
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmPresence',

  props: {
    trip: {
      type: Object,
      required: true,
    },
  },

  emits: ['confirm', 'decline'],

  data() {
    return {
      selectedTripType: 'idavolta',
      tripOptions: [
        { value: 'ida',      label: 'Só ida'      },
        { value: 'volta',    label: 'Só volta'    },
        { value: 'idavolta', label: 'Ida e Volta' },
      ],
    }
  },

  methods: {
    handleConfirm() {
      this.$emit('confirm', {
        trip: this.trip,
        tripType: this.selectedTripType,
      })
    },
  },
}
</script>

<style scoped>
@import '@/assets/styles/ConfirmPresence.css';
</style>