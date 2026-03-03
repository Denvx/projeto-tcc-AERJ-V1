<template>
  <div
    class="stats-card"
    :class="{
      'stats-card--dark': variant === 'dark',
      'stats-card--hide-mobile': hideMobile,
    }"
  >
    <p class="stats-card__label">{{ label }}</p>
    <p class="stats-card__value">{{ String(value).padStart(2, '0') }}</p>

    <div
      class="stats-card__icon"
      :class="iconColorClass"
    >
      <span class="material-symbols-outlined">{{ icon }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TripStatsCard',

  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'light',
      // 'light' | 'dark'
    },
    iconColor: {
      type: String,
      default: 'default',
      // 'default' | 'red' | 'green'
    },
    hideMobile: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    iconColorClass() {
      if (this.iconColor === 'red')   return 'stats-card__icon--red'
      if (this.iconColor === 'green') return 'stats-card__icon--green'
      return ''
    },
  },
}
</script>

<style scoped>
@import '@/assets/styles/TripStatsCard.css';
</style>