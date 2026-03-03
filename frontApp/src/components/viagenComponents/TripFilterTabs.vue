<template>
  <div class="filter-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="filter-tabs__btn"
      :class="{ 'filter-tabs__btn--active': modelValue === tab.value }"
      @click="$emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'TripFilterTabs',

  props: {
    modelValue: {
      type: String,
      required: true,
      // 'todas' | 'proximas' | 'passadas'
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      tabs: [
        { value: 'todas',    label: 'Todas'    },
        { value: 'proximas', label: 'Próximas' },
        { value: 'passadas', label: 'Passadas' },
      ],
    }
  },
}
</script>

<style scoped>
@import '@/assets/styles/TripFilterTabs.css';
</style>