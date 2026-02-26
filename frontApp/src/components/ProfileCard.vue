<template>
  <div class="profile-card">

    <!-- Avatar -->
    <div class="profile-card__avatar-wrap">
      <div class="profile-card__avatar">
        <img v-if="user.avatar" :src="user.avatar" :alt="user.name" />
        <span v-else>{{ initials }}</span>
      </div>
      <button class="profile-card__avatar-btn" @click="$emit('change-photo')">
        <span class="material-symbols-outlined">photo_camera</span>
      </button>
    </div>

    <!-- Nome e role -->
    <div style="text-align: center">
      <p class="profile-card__name">{{ user.name }}</p>
      <span class="profile-card__role">{{ user.role }}</span>
    </div>

    <!-- Botão alterar foto -->
    <button class="profile-card__photo-btn" @click="$emit('change-photo')">
      Alterar Foto
    </button>

    <div class="profile-card__divider"></div>

    <!-- Estatísticas -->
    <div class="profile-card__stats">
      <p class="profile-card__stats-label">Estatísticas Rápidas</p>

      <div class="profile-card__stat">
        <span class="profile-card__stat-name">Viagens este mês</span>
        <span class="profile-card__stat-value">{{ stats.tripsThisMonth }}</span>
      </div>

      <div class="profile-card__stat">
        <span class="profile-card__stat-name">Status da conta</span>
        <span class="profile-card__stat-value--active">
          <span class="profile-card__stat-dot"></span>
          Ativa
        </span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ProfileCard',

  props: {
    user: {
      type: Object,
      required: true,
      // { name, role, avatar }
    },
    stats: {
      type: Object,
      default: () => ({ tripsThisMonth: 0 }),
    },
  },

  emits: ['change-photo'],

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
@import '@/assets/styles/ProfileCard.css';
</style>