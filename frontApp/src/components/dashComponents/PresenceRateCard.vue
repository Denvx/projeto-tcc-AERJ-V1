<template>
  <div class="presence">

    <div class="presence__header">
      <div>
        <p class="presence__label">Presença</p>
        <h3 class="presence__rate">{{ rate }}%</h3>
      </div>
      <p class="presence__goal">{{ goalLabel }}</p>
    </div>

    <div class="presence__bar-track">
      <div
        class="presence__bar-fill"
        :class="barColor"
        :style="{ width: rate + '%' }"
      ></div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PresenceRateCard',

  props: {
    rate: {
      type: Number,
      required: true,
    },
    goal: {
      type: Number,
      default: 90,
    },
  },

  computed: {
    barColor() {
      if (this.rate >= this.goal)       return 'presence__bar-fill--success'
      if (this.rate >= this.goal * 0.7) return 'presence__bar-fill--default'
      return 'presence__bar-fill--danger'
    },

    goalLabel() {
      return window.innerWidth <= 768
        ? 'Frequência mensal'
        : `Meta mensal: ${this.goal}%`
    },
  },
}
</script>

<style scoped>
@import '@/assets/styles/PresenceRateCard.css';
</style>