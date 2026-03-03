<template>
  <div>

    <!-- Card de informações (desktop) -->
    <div class="profile-info">

      <!-- Cabeçalho -->
      <div class="profile-info__header">
        <h2 class="profile-info__title">Informações Pessoais</h2>
        <button class="profile-info__edit-icon" @click="$emit('edit')">
          <span class="material-symbols-outlined">badge</span>
        </button>
      </div>

      <!-- Grid de campos -->
      <div class="profile-info__grid">
        <div class="profile-info__field">
          <label class="profile-info__label">Nome Completo</label>
          <input class="profile-info__input" :value="user.name" :disabled="!editing" />
        </div>
        <div class="profile-info__field">
          <label class="profile-info__label">E-mail</label>
          <input class="profile-info__input" :value="user.email" :disabled="!editing" type="email" />
        </div>
        <div class="profile-info__field">
          <label class="profile-info__label">Telefone</label>
          <input class="profile-info__input" :value="user.phone" :disabled="!editing" />
        </div>
        <div class="profile-info__field">
          <label class="profile-info__label">CPF</label>
          <input class="profile-info__input" :value="user.cpf" disabled />
        </div>
        <div class="profile-info__field profile-info__field--full">
          <label class="profile-info__label">Endereço Residencial</label>
          <input class="profile-info__input" :value="user.address" :disabled="!editing" />
        </div>
      </div>

      <!-- Rodapé -->
      <div class="profile-info__footer">
        <div class="profile-info__member-since">
          <span class="material-symbols-outlined" style="font-size: 1rem;">calendar_today</span>
          Membro desde: <strong>{{ user.memberSince }}</strong>
        </div>
        <button class="profile-info__btn-edit" @click="$emit('edit')">
          <span class="material-symbols-outlined">edit</span>
          Editar Informações
        </button>
      </div>

      <!-- Aviso de segurança -->
      <div class="profile-info__notice">
        <span class="material-symbols-outlined profile-info__notice-icon">info</span>
        <p class="profile-info__notice-text">
          Algumas informações como o <strong>CPF</strong> não podem ser alteradas diretamente por
          questões de segurança. Caso precise atualizar, entre em contato com o suporte.
        </p>
      </div>

    </div>

    <!-- Lista de informações (mobile) -->
    <div class="profile-info">
      <div class="profile-info__header">
        <h2 class="profile-info__title">Informações Pessoais</h2>
      </div>

      <div class="profile-info__list">
        <div class="profile-info__item" v-for="item in infoItems" :key="item.label">
          <div class="profile-info__item-icon" :class="{ 'profile-info__item-icon--dark': item.dark }">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
          </div>
          <div class="profile-info__item-content">
            <p class="profile-info__item-label">{{ item.label }}</p>
            <p class="profile-info__item-value">{{ item.value }}</p>
          </div>
          <span v-if="item.verified" class="profile-info__item-verified">
            <span class="material-symbols-outlined">verified</span>
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ProfileInfo',

  props: {
    user: {
      type: Object,
      required: true,
      // { name, email, phone, cpf, address, memberSince }
    },
    editing: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['edit'],

  computed: {
    infoItems() {
      return [
        { icon: 'person',       label: 'Nome Completo',        value: this.user.name,    dark: false, verified: false },
        { icon: 'mail',         label: 'E-mail',               value: this.user.email,   dark: false, verified: true  },
        { icon: 'phone',        label: 'Telefone',             value: this.user.phone,   dark: false, verified: false },
        { icon: 'location_on',  label: 'Endereço Residencial', value: this.user.address, dark: true,  verified: false },
      ]
    },
  },
}
</script>

<style scoped>
@import '@/assets/styles/ProfileInfo.css';
</style>