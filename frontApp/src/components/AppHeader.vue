<template>
  <header class="header">

    <!-- Breadcrumb -->
    <div class="header__breadcrumb">
      <span class="header__breadcrumb-parent">{{ breadcrumb.parent }}</span>
      <span class="header__breadcrumb-separator">/</span>
      <span class="header__breadcrumb-current">{{ breadcrumb.current }}</span>
    </div>

    <!-- Actions -->
    <div class="header__actions">

      <!-- Notificações -->
      <button class="header__notifications" @click="$emit('open-notifications')">
        <span class="material-symbols-outlined">notifications</span>
        <span v-if="hasNotifications" class="header__notifications-badge"></span>
      </button>

      <div class="header__divider"></div>

      <!-- Perfil -->
      <div class="header__profile">
        <div class="header__profile-info">
          <p class="header__profile-name">{{ user.name }}</p>
          <p class="header__profile-role">{{ user.role }}</p>
        </div>
        <div class="header__avatar">
          <img v-if="user.avatar" :src="user.avatar" :alt="user.name" />
          <span v-else>{{ initials }}</span>
        </div>
      </div>

    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',

  props: {
    user: {
      type: Object,
      required: true,
      // { name: String, role: String, avatar: String }
    },
    breadcrumb: {
      type: Object,
      default: () => ({ parent: 'Dashboard', current: 'Visão Geral' }),
    },
    hasNotifications: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['open-notifications'],

  computed: {
    initials() {
      return this.user.name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    },
  },
}
</script>

<style scoped>
@import '@/assets/styles/AppHeader.css';
</style>