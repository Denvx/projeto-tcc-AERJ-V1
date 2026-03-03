<template>
  <div class="settings-section">
    <div class="settings-section__header">
      <span class="settings-section__icon">
        <span class="material-symbols-outlined">{{ icon }}</span>
      </span>
      <h3 class="settings-section__title">{{ title }}</h3>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SettingsSection',

  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
@import '@/assets/styles/Settings/SettingsSection.css';
</style>