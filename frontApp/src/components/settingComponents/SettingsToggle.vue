<template>
  <div class="settings-toggle" @click="handleRowClick">

    <!-- Esquerda: ícone + texto -->
    <div class="settings-toggle__left">
      <span class="settings-toggle__icon">
        <span class="material-symbols-outlined">{{ icon }}</span>
      </span>
      <div class="settings-toggle__text">
        <span class="settings-toggle__label">{{ label }}</span>
        <span v-if="description" class="settings-toggle__desc">{{ description }}</span>
      </div>
    </div>

    <!-- Direita: depende do tipo -->
    <div class="settings-toggle__right">

      <!-- Toggle switch -->
      <label v-if="type === 'toggle'" class="settings-toggle__switch" @click.stop>
        <input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)" />
        <span class="settings-toggle__track"></span>
        <span class="settings-toggle__thumb"></span>
      </label>

      <!-- Botão (desktop) -->
      <button v-if="type === 'button'" class="settings-toggle__btn" @click.stop="$emit('action')">
        {{ actionLabel }}
      </button>

      <!-- Select (desktop) -->
      <select v-if="type === 'select'" class="settings-toggle__select" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)" @click.stop>
        <slot name="options" />
      </select>

      <!-- Mobile: valor + seta (para button e select) -->
      <template v-if="type === 'button' || type === 'select'">
        <span class="settings-toggle__value">{{ mobileValue }}</span>
        <span class="material-symbols-outlined settings-toggle__arrow">chevron_right</span>
      </template>

    </div>

  </div>
</template>

<script>
export default {
  name: 'SettingsToggle',

  props: {
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'toggle',
      // 'toggle' | 'button' | 'select'
    },
    modelValue: {
      type: [Boolean, String],
      default: false,
    },
    actionLabel: {
      type: String,
      default: '',
    },
    mobileValue: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue', 'action'],

  methods: {
    handleRowClick() {
      if (this.type === 'button') this.$emit('action')
    },
  },
}
</script>

<style scoped>
@import '@/assets/styles/Settings/SettingsToggle.css';
</style>